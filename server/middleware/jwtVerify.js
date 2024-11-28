const jwt = require('jsonwebtoken');


function jwtVerify(req,res,next){
    
    const token = req.cookies.authToken
    // let userId;
    console.log("TOKEN", req.cookies)
    try {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            console.log("decoded", decoded)
            // let email = decoded.email;
            // userId = de<coded.id;
            // req.user = req.user || {};
            // if(email) {
                // req.user.email = email;

            // }

            // console.log(req.user)

            
          }); 
    } catch (error) {
        console.log(error, "error token")
    }

    next();
}

module.exports = jwtVerify;