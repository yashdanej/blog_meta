const jwt = require('jsonwebtoken');
const { createError } = require('./error');

exports.verifyToken = (req, res, next, verifyUser=false) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies.access_token;
        if(!token){
            reject(createError(401, "You are not authenticated"));
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err)
                reject(createError(403, "Token is not valid!"));
            req.user = user;
            if(!verifyUser){
                next();
                resolve();
            }else{
                resolve(req.user.id);
            }
        });
    });
}