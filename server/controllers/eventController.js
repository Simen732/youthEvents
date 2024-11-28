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
        const {eventName, eventLocation, eventDate, eventPrice, eventDescription} = req.body
        console.log(req.body)
    }
    // join: async (req, res) => {}
}


module.exports = eventController;