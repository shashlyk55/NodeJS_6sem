const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const users = require('./user.json')

const app = express();

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new DigestStrategy({ qop: 'auth' },
    (username, done) => {
        if (!users[username]) return done(null, false);
        return done(null, { username }, users[username]);
    },
    (params, done) => {
        done(null, true);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    if (users[username]) {
        done(null, { username });
    } else {
        done(null, false);
    }
});

app.get('/login', 
    passport.authenticate('digest', { session: true }),
    (req, res) => {
        req.session.user = req.user;
        res.send(`you entered like ${req.user.username}`);
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.send('logout successfully');
        });
    });
});

app.get('/resource', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('access denied. <a href="/login">/login</a>');
    }
    res.send(`hello, ${req.user.username}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

