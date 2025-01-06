const db = require("../db/dbConfig.js");


const eventController = {
    join: async (req, res) => {
        const { eventId } = req.body;
        const userID = req.user.id;

        console.log(eventId, req.body);
        if (!userID) {
            console.log("User not found");
            return res.status(401).json({ msg: "User not found" });
        }

        try {
            const [existingAttendance] = await db.query(
                'SELECT * FROM attendees WHERE user_iduser = ? AND events_idevent = ?',
                [userID, eventId]
            );

            if (existingAttendance.length === 0) {
                await db.query(
                    'INSERT INTO attendees (user_iduser, events_idevent) VALUES (?, ?)',
                    [userID, eventId]
                );

                await db.query(
                    'UPDATE events SET interestedCount = interestedCount + 1 WHERE idevent = ?',
                    [eventId]
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
    },
    getAllEvents: async (req, res) => {
        try {
            const [results] = await db.query('SELECT * FROM events');
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching events');
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const [result] = await db.query('DELETE FROM events WHERE idevent = ?', [eventId]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Event not found' });
            }
            
            res.json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error('Error deleting event:', error);
            res.status(500).json({ message: 'Error deleting event' });
        }
    },
    getEventById: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const userId = req.user.id;

            const [events] = await db.query('SELECT * FROM events WHERE idevent = ?', [eventId]);
            
            if (events.length === 0) {
                return res.status(404).json({ message: 'Event not found' });
            }

            const event = events[0];

            const [attendees] = await db.query(
                'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
                [eventId, userId]
            );

            event.hasJoined = attendees.length > 0;

            res.json(event);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error' });  
        }
    },
    leaveEvent: async (req, res) => {
        try {
            const eventId = req.body.eventId;
            const userId = req.user.id;

            if (!eventId) {
                return res.status(400).json({ message: 'Invalid event ID' });
            }

            await db.query('START TRANSACTION');

            const [attendee] = await db.query(
                'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
                [eventId, userId]
            );

            if (attendee.length === 0) {
                await db.query('ROLLBACK');
                return res.status(400).json({ message: 'You have not joined this event' });
            }

            await db.query(
                'DELETE FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
                [eventId, userId]
            );

            await db.query(
                'UPDATE events SET InterestedCount = GREATEST(InterestedCount - 1, 0) WHERE idevent = ?',
                [eventId]
            );

            await db.query('COMMIT');

            res.status(200).json({ message: 'Successfully left the event' });
        } catch (error) {
            await db.query('ROLLBACK');
            console.error('Error leaving event:', error);
            res.status(500).json({ message: 'Error leaving event', error: error.message });
        }
    },
    getEventStatus: async (req, res) => {
        try {
            const eventId = req.query.eventId;
            const userId = req.user.id;
              
            if (!eventId) {
                return res.status(400).json({ message: 'Invalid event ID' });
            }
        
            const [existingAttendee] = await db.query(
                'SELECT * FROM attendees WHERE events_idevent = ? AND user_iduser = ?',
                [eventId, userId]
            );
        
            res.json({ 
                hasJoined: existingAttendee.length > 0 
            });
        } catch (error) {
            console.error('Error checking event join status:', error);
            res.status(500).json({ message: 'Error checking join status', error: error.message });
        }
    }
}


module.exports = eventController;