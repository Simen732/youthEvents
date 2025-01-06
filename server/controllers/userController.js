const db = require("../db/dbConfig.js");

const userController = {
    getUserEvents: async (req, res) => {
        try {
            const userId = req.user.id;
            const [events] = await db.query('SELECT * FROM events WHERE user_iduser = ?', [userId]);
            res.json(events);
        } catch (error) {
            console.error('Error fetching user events:', error);
            res.status(500).json({ message: 'Error fetching user events' });
        }
    }
};

module.exports = userController;
