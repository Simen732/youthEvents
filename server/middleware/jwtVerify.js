const jwt = require('jsonwebtoken');


async function jwtVerify(){
    const token = req.cookies.authToken

    // let userId;
    console.log(token)
    try {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            console.log(decoded.id)
            // userId = decoded.id;

            req.user.id = decoded.id;
            
          }); 
    } catch (error) {
        console.log(error, "error token")
    }

    next();
}

module.exports = jwtVerify;