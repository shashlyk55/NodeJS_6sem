const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(express.json())
dotenv.config({path: './settings.env'})

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(`error connecting to db: ${err}`))

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/posts', postRoutes);
app.use('/user', userRoutes)

const PORT = process.env.HTTP_PORT
const HOST = process.env.HTTP_HOST
app.listen(PORT, HOST, () => {
    console.log(`server satarted on ${HOST}:${PORT}`);
})
