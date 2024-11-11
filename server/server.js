const express = require("express");
const cors = require("cors");
const { passwordStrength } = require('check-password-strength');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const db = require("./db/dbConfig.js");

const app = express();

const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST",
    credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Use cookie parser to manage cookies


app.get("/", (req, res) => {
    res.send("Si Hei");
});

app.post("/api/user/signup", async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    const sqlQuery = 'INSERT INTO user (userName, email, password, roles_idroles) VALUES (?, ?, ?, (SELECT idroles FROM roles WHERE name = ?))';

    if (password === repeatPassword) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        try {
            const [user] = await db.query(sqlQuery, [username, email, hashedPassword, "user"]);
            if (user.affectedRows === 1) {
                res.status(200).json({ msg: "User created" });
                
            } else {
                res.status(500).json({ msg: "Error: User not created" });
            }
        } catch (error) {
            res.status(500).json({ msg: `Server error: ${error}` });
        }
    } else {
        res.status(400).json({ msg: "Passwords do not match", strength: passwordStrength(password).value });
    }
});

app.post("/api/user/login", async (req, res) => {
    const { email, password } = req.body;

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
            
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            
            // Set token in an HTTP-only cookie
            const cookie = res.cookie("authToken", token, {
                httpOnly: true, // Prevent JavaScript access
                // secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                maxAge: 3600000,
                // sameSite: "lax" // 1 hour
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
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
