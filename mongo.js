const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("express-hbs")


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
    res.sendFile( __dirname + '/Public/profile.html')
})

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

app.post("/signup", (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    app.get('/user/show/:name', async function (req, res) {
        let name = req.params.name;
        let user = await db.collection("reglog").findOne({name: name});
        res.render('user', {user: user});
    });

    app.get('/signup', async function (req, res) {
        let name = req.params.name;
        let user = await db.collection.findOne({name: name});
        res.render('/Public/registration_successfull', {user: user});
    });

    let data = {
        "name": name,
        "email":email,
        "password": password
    }
    db.collection('reglog').insertOne(data,(err, collection)=> {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/signup')
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