if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path:'config.env'});
}

const express = require('express');
const dotenv =  require("dotenv");
const path = require('path')
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection');
const passport = require('passport');
const initializePassport = require("./server/passport/passport-config")

const flash = require('express-flash');
const session = require('express-session');
const userDb = require('./server/model/model');

const app = express();

//import confif env
dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080;

//mongoDB connection
connectDB();

initializePassport(
    passport,
    async (username) => await userDb.find().then(user =>{
        return user.find(user => user.username === username);        
    }),
    async (id) => await userDb.find().then(user =>{
        return user.find(user => user.id === id);   
    })
);

//USE
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false, // we wont resave the sesseion if nothing is changed
    saveUninitialized: false // we wont save if nothing change already
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));

//Load assets
app.use('/css', express.static(path.resolve(__dirname,'assets/css')));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));

//import routes
app.use('/', require('./server/routes/router'));

//Set view engine
app.set("view engine", "ejs");

//import database
// app.use('/', require('./server/database/connection'));

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT} `);
});

