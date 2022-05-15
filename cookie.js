const express = require('express');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
let sessions = require('express-session');
let ejs = require('ejs');


const app = express();
const port = 2992;

app.set('view engine', 'ejs');
app.set('views','temp')
app.use(express.static('static'));
app.use(cookie());
app.use(bodyParser.urlencoded({extended: true}))
app.use(sessions({secret: 'SYYYYR', cookie: {}, resave: false, saveUninitialized: true}))


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/Public/profile.html')
});


app.post('/register', (req, res) => {
    res.cookie("email", req.body.email)
    res.send("<h1>WELCOME,  " + req.cookies.email + "</h1>");
})

app.get('main',(req,res,next) => {
    res.render("main",
        {
            var1: req.cookies.email
        });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Public/loginProfile.html')
});

app.get('/bag', (req,res) => {
    res.sendFile( __dirname + '/bag.html')
})

app.get('/manga', (req,res) => {
    res.sendFile( __dirname + '/manga.html')
})

app.get('/reports', (req,res) => {
    res.sendFile( __dirname + '/reports.html')
})

app.get('/pillow', (req,res) => {
    res.sendFile( __dirname + '/pillow.html')
})

app.get('/futbolka', (req,res) => {
    res.sendFile( __dirname + '/futbolka.html')
})

app.get('/figure', (req,res) => {
    res.sendFile( __dirname + '/figure.html')
})

app.get('/main', (req,res) => {
    res.sendFile( __dirname + '/index.html')
})
app.get('/time', (req, res) => {
    if(req.session.lastentry === undefined) {
        req.session.lastentry = Date.now() / 1000
        res.send('TIME')
    }else{
        let time = Date.now() / 1000
        let difTime = Math.trunc(time - req.session.lastentry)
        req.session.lastentry = time
        res.send("<h1>Your time visit : " + difTime +" sec </h1>")
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
