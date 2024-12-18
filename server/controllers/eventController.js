const db = require("../db/dbConfig.js");
const jwt = require('jsonwebtoken');


const eventController = {
    join: async (req, res) => {
        const {eventID} = req.body

        const userID = req.user.id;

        if(userID) {
            console.log("User found")

        } else {
            console.log("User not found")
            res.status(404).json({msg: "User not found"})
        }
        
    },
    createEvent: async (req, res) => {
        const {name, location, date, time, price, duration, description, imagePath, fotball} = req.body
        console.log(req.body, "req body")

        const dateTime = `${date} ${time}`;

        console.log(req.user);
        let email = req.user.email;
        console.log(email, "EMAIL CREATE EVENT");
        const sqlQuery = `INSERT INTO events 
        (eventName, eventLocation, eventDate, price, eventDescription, 
        user_iduser, location_idlocation, duration, eventImage, tags) VALUES (?, ?, ?, ?, ?, 
        (select iduser from user where email = ?), 
        (select idlocation from location where name = ?), ?, ?, ?)`;
        // const sqlQuery = 'INSERT INTO events (eventName, eventLocation, eventDate, price, eventDescription) VALUES (?, ?, ?, (SELECT idevent FROM events WHERE name = ?), ?)';
        try {
            const [event] = await db.query(sqlQuery, [name, location, dateTime, price, description, email,  "Asker", duration, imagePath, "Fotball, Outdoors"]);
            console.log(event);
           
            if (event.affectedRows === 1) {
                res.status(200).json({ msg: "event created" });
                
            } else {
                res.status(500).json({ msg: "Error: event not created" });
            }
        } catch (error) {
            res.status(500).json({ msg: `Server error: ${error}` });
        }
    }
    // join: async (req, res) => {}
}


module.exports = eventController;