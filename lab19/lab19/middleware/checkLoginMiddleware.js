const jwt = require('jsonwebtoken');
const User = require('../models/User')

const checkLoginMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {        
        return res.redirect('/user/slogin');
    }

    try {        
        const decoded = jwt.verify(token, 'secret_key');

        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.redirect('/user/login');
        }
        req.username = user.unique_username
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/user/login');
    }
};

module.exports = checkLoginMiddleware