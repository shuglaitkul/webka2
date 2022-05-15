const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("express-hbs");
const UsersSchema = require('./models/Users');

const app = express();

app.use(bodyParser.json());
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/RegForm',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',()=>console.log("Error to connection"));
db.once('open',()=>console.log("Connected to Database"));

app.get('/register', (req,res) => {
    res.sendFile( __dirname + '/html/profile.html')
})

app.get('/bags', (req,res) => {
    res.sendFile( __dirname + '/html/bags.html')
})

app.get('/manga', (req,res) => {
    res.sendFile( __dirname + '/html/manga.html')
})

app.get('/reports', (req,res) => {
    res.sendFile( __dirname + '/html/reports.html')
})

app.get('/pillow', (req,res) => {
    res.sendFile( __dirname + '/html/pillow.html')
})

app.get('/futbolka', (req,res) => {
    res.sendFile( __dirname + '/html/futbolka.html')
})

app.get('/figure', (req,res) => {
    res.sendFile( __dirname + '/html/figure.html')
})

app.get('/main', (req,res) => {
    res.sendFile( __dirname + '/html/index.html')
})

app.post("/signup", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let data = {
        "username": name,
        "email": email,
        "city": "test",
        "password": password
    }

    await UsersSchema.create(data);

    return res.redirect('/profile');
})

app.get("/", function (req,res){
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/register')
})

app.listen(2929, function () {
    console.log("Server Started");
})