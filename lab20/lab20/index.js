const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Routes = require('./routes/Routes')
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use('/', Routes)

app.listen(4000, () => console.log("server is listening on 4000 port"));
