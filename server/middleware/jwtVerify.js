const jwt = require('jsonwebtoken');



const jwtVerify= async (req, res, next) => {
    try {


    const token = req.cookies.authToken
    // let userId;
    console.log("TOKEN", req.cookies)
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            console.log("decoded", decoded)
            let email = decoded.email;
            userId = decoded.id;
            req.user = req.user || {};
            if(email) {
                req.user.email = email;

            }

            console.log(req.user)

            
          }); 
    } catch (error) {
        console.log(error, "error token")
    }

    next();
}

module.exports = jwtVerify;