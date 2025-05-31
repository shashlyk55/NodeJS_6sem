const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

const users = {
  user1: { username: 'user1', password: '123' },
  user2: { username: 'user2', password: '111' }
};

function checkAuth(req, res, next){
    const username = req.cookies.user;
  if (!username) {
    return res.redirect('/login');
  }
  return next()
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/view/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    res.cookie('user', username, { maxAge: 900000 });
    res.redirect('/protected');
  } else {
    res.status(401).send('Неверный логин или пароль');
  }
});

app.get('/protected', checkAuth, (req, res) => {
  const username = req.cookies.user;
  
  res.send(`<h1>Добро пожаловать, ${username}!</h1><p><a href="/logout">Выйти</a></p>`);
});

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
