const express = require("express");
const cors = require("cors");

const app = express();

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
    console.log(req.body, "REQ, BODY");
    res.status(200).json({msg: "OK"})
})

app.listen(4000);