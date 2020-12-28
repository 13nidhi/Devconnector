const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
// Get token from header 
const token = req.header('x-auth-token');

// check if not token
if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied '});
}

// Verify token
//jwt.verify take 2 thing actual token and secret
try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    //console.log(req.user.id);
    next();
} catch(err) {
    res.status(401).json({ msg: 'Token is not valid '});
 }
};