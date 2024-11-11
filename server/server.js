const express = require("express");
const cors = require("cors");
const db = require ("./db/dbConfig.js");
const { passwordStrength } = require('check-password-strength')


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

app.post("/api/user", async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;
    let slqQuery = 'insert into user (userName, email, password, roles_idroles) values (?,?,?, (select idroles from roles where name = ?))'



    if (password == repeatPassword) {
        console.log(slqQuery);
        const [user] = await db.query(slqQuery, [username, email, password, "user"]);
        console.log(user, "USER");
        db.query(slqQuery, [username, email, password]).then(([rows]) => {
            console.log(rows, "USERROWS");
            if(rows.affectedRows === 1){
                res.status(200).json({msg: "user created"})
            } else{
                res.status(200).json({msg: "Something happend, errorororoorrororroror"})
            }
        }).catch((error) => {
            res.status(500).json({msg: `Server erorororororoororor${error}`})
        })

        console.log("dsadsadsadsadsadas")
    }
    else{
        console.log(req.body, "REQ, BODY");
        console.log("Passwords do NOT   Match")
        console.log(`Passordet ditt er ${password} og det er ` + passwordStrength(password).value)

    }
})

app.listen(4000);