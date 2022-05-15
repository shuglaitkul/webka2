const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/ass5',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',()=>console.log("Error to connection"));
db.once('open',()=>console.log("Connected to Database"));

app.get('/register', (req,res) => {
    res.sendFile( __dirname + 'Public/profile.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + 'Public/loginProfile.html')
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

app.get('/user/show/:name', function(req, res) {
    console.log(req.params.name);
});

app.get('/user/show/:email', function(req, res) {
    console.log(req.params.email);
});

app.post("/signup", (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

app.get("/signup",(req,res)=> {
    res.sendFile(__dirname + '/Public/registration_successful.html')
})

    app.get('/user/show/:name', async function (req, res) {
        let name = req.params.name;
        let user = await db.findOne({name: name});
        res.send('name: ' + user.name + 'salary: ' + user.salary);
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

//================================================= log in =============================================

app.post("/signin", (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    app.get("/signin",(req,res)=> {
        res.sendFile(__dirname + '/Public/account.html')
    })
    app.get('/user/show/:email', async function (req, res) {
        let email = req.params.email;
        let user = await db.findOne({email: email});
        res.send('email: ' + user.email + 'salary: ' + user.salary);
    });
    let data = {
        "email": email,
        "password": password
    }
    db.collection('log').insertOne(data,(err, collection)=> {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('/signin')
})
app.get("/", function (req,res){
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/login')
})
//================================================= log in =============================================

app.listen(2929, function () {
    console.log("Server Started");
})

