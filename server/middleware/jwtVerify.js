const jwt = require('jsonwebtoken');

const jwtVerify = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Invalid token" });
            }
            
            // Set the entire decoded user object to req.user
            req.user = decoded;
            console.log(req.user)
            next();
        });
    } catch (error) {
        console.log(error, "error token");
        return res.status(500).json({ msg: "Server error during authentication" });
    }
};

module.exports = jwtVerify;