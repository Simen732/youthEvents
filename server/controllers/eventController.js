const db = require("../db/dbConfig.js");


const eventController = {
    join: async (req, res) => {
        const { eventID } = req.body;
        const userID = req.user.iduser;

        if (!userID) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        try {
            // Check if the user is already attending this event
            const [existingAttendance] = await db.query(
                'SELECT * FROM attendees WHERE user_iduser = ? AND events_idevent = ?',
                [userID, eventID]
            );

            if (existingAttendance.length === 0) {
                // If not, add the user's attendance
                await db.query(
                    'INSERT INTO attendees (user_iduser, events_idevent) VALUES (?, ?)',
                    [userID, eventID]
                );

                // Update the interested_count in the events table
                await db.query(
                    'UPDATE events SET interested_count = interested_count + 1 WHERE idevent = ?',
                    [eventID]
                );

                console.log("User added to event");
                res.status(200).json({ msg: "Successfully joined the event" });
            } else {
                console.log("User already joined this event");
                res.status(400).json({ msg: "Already joined this event" });
            }
        } catch (error) {
            console.error("Error joining event:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    },
    createEvent: async (req, res) => {
        const {name, location, date, time, price, duration, description, imagePath, tag} = req.body
        console.log(req.body, "req body")

        const dateTime = `${date} ${time}`;

        let email = req.user.email;
        console.log(email, "EMAIL CREATE EVENT");
        const sqlQuery = `INSERT INTO events 
        (eventName, eventLocation, eventDate, price, eventDescription, 
        user_iduser, location_idlocation, duration, eventImage, tags) VALUES (?, ?, ?, ?, ?, 
        (select iduser from user where email = ?), 
        (select idlocation from location where name = ?), ?, ?, ?)`;
        // const sqlQuery = 'INSERT INTO events (eventName, eventLocation, eventDate, price, eventDescription) VALUES (?, ?, ?, (SELECT idevent FROM events WHERE name = ?), ?)';
        try {
            const [event] = await db.query(sqlQuery, [name, location, dateTime, price, description, email,  "Asker", duration, imagePath, tag]);

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