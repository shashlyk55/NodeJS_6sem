// authMiddleware.js
module.exports = (req, res, next) => {
    if (req.session.user) {
        return next(); // Если пользователь залогинен, пропускаем дальше
    }
    res.redirect('/login'); // Иначе редиректим на страницу входа
};