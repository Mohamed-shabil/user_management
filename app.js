const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
const session = require('express-session');
const flash = require('connect-flash')
const adminRoute = require('./routes/adminRoute')
const morgan = require('morgan');
const path = require('path');
const nocache = require("nocache");


dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then( ()=>{console.log('DB Connection Successful !');})  


app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(
    session({
      secret: "uuidv5",
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(flash());
app.use(nocache());


app.use('/',userRoute);
app.use('/admin',adminRoute);
app.set('views',path.join(__dirname,"views"))
app.set("view engine", "ejs");

app.listen(3000,()=>{
    console.log("listening");
})