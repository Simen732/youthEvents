const express = require("express");
const cors = require("cors");
const db = require ("./db/dbConfig.js");

const app = express();
console.log("hallo");

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST",
    credentials: true
}

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Si Hei")
})

app.post("/api/user", (req, res) => {
    const {email, password, repeatPassword} = req.body;
    if (password == repeatPassword) {
        console.log(req.body, "REQ, BODY");
        console.log("Passwords Match")
    }
    else{
        console.log(req.body, "REQ, BODY");
        console.log("Passwords do NOT   Match")

    }
})

app.listen(4000);