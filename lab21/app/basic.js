const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('./user.json');

const app = express();
const PORT = 3000;

passport.use(new BasicStrategy(
    (username, password, done) => {
        if (users[username] && users[username] === password) {
            return done(null, { username });
        }
        return done(null, false);
    }
));

const authenticate = passport.authenticate('basic', { session: false });

app.get('/login', authenticate, (req, res) => {
    res.send(`entered like ${req.user.username} <a href="/resource">/resource</a>`);
});

app.get('/resource', authenticate, (req, res) => {
    res.send(`hello, ${req.user.username}!`);
});

app.get('/logout', (req, res) => {
    res.status(401).send('logout <a href="/login">/login</a>');
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
