const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../db/dbConfig.js");
const { passwordStrength } = require('check-password-strength');
const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10; 

const authController = { 
    login: async (req, res) => {
        const { email, password} = req.body;
        try {
            // Check if the user exists with the given email
            const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
            
            if (rows.length === 0) {
                return res.status(401).json({ msg: "Invalid email or password" });
            }
    
            const user = rows[0];
    
            // Compare the provided password with the stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
    
            if (isPasswordMatch) {
                // If passwords match, login is successful
                console.log("Du er nå logget inn")
                
                const token = jwt.sign({ id: user.iduser, email: user.email, username: user.userName }, SECRET_KEY, { expiresIn: '24h' });

                // Set token in an HTTP-only cookie
                const cookie = res.cookie("authToken", token, {
                    httpOnly: true, // Prevent JavaScript access
                    // secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                    maxAge: 86400000,
                    // sameSite: "lax" // 10 hour
                });
                res.status(200).json({ msg: "Login successful", user: { id: user.id, email: user.email, username: user.userName } });
    
            } else {
                // If passwords do not match
                res.status(401).json({ msg: "Invalid email or password" });
                console.log("Passord er feil")
    
            }
        } catch (error) {
            res.status(500).json({ msg: `Server error: ${error}` });
        }
    

    }, signup: async (req, res) => {
        console.log(req.body);
        const { username, email, password, repeatPassword } = req.body;
        const insertQuery = 'INSERT INTO user (userName, email, password, roles_idroles) VALUES (?, ?, ?, (SELECT idroles FROM roles WHERE name = ?))';
        const selectQuery = 'SELECT * FROM user WHERE email = ?';

        if (password === repeatPassword) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
        
            try {
                const [result] = await db.query(insertQuery, [username, email, hashedPassword, "user"]);
                if (result.affectedRows === 1) {
                    // Fetch the newly created user
                    
                    const [rows] = await db.query(selectQuery, [email]);
                    const newUser = rows[0];

                    // Create and set the token
                    const token = jwt.sign({ id: newUser.id, email: newUser.email, username: newUser.userName }, SECRET_KEY, { expiresIn: '24h' });
                
                    res.cookie("authToken", token, {
                        httpOnly: true, 
                        maxAge: 86400000,
                    });
                    console.log(token);
                    res.status(200).json({ msg: "signup successful", user: { id: newUser.id, email: newUser.email, username: newUser.userName } });
                } else {
                    res.status(500).json({ msg: "Error: User not created" });
                }
            } catch (error) {
                res.status(500).json({ msg: `Server error: ${error}` });
            }
        } else {
            res.status(400).json({ msg: "Passwords do not match", strength: passwordStrength(password).value });
        }
    }
};


module.exports = authController;