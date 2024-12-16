const express = require("express");
const cors = require("cors");
const { passwordStrength } = require('check-password-strength');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const db = require("./db/dbConfig.js");
const authRoutes = require("./routes/authRoutes.js")
const eventRoutes = require("./routes/eventRoutes.js")
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
app.use(express.urlencoded({ extended: true}))

app.use('/api/user', authRoutes)
app.use('/api/event', eventRoutes)

app.get("/", (req, res) => {
    res.send("Si Hei");
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});