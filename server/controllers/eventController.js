const eventController = {
    join: async (req, res) => {
        const {eventID} = req.body

        const userID = req.user.id;

        if(userID) {

        } else {
            res.status(404).json({msg: "User not found"})
        }
        
    }
    // join: async (req, res) => {}
}


module.exports = eventController;