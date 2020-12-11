require('dotenv').config()
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
var expressValidator=require('express-validator');
const flash=require('connect-flash');
const session=require('express-session');
const db=process.env.DATABASE_URL;
const connect = mongoose
  .connect(db, { useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true })
  .then(() => console.log("Mondo db connected...."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname + '/public')));

/*app.use(session({
    secret: "keyboard cat",
    resave:true,
    saveUninitialized:true
}));

app.use(require('connect-flash'));
app.use(function(req,res,next){
    res.locals.messages=require('express-messages')(req,res);
    next();
});

//const { body, validationResult } = require('express-validator');

/*app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace = param.split('.'),
        root=namespace.shift(),
        formParam=root;

        while(namespace.length){
            formParam+='['+namespace.shift()+ ']';
        }

        return{
            param:formParam,
            msg:msg,
            value:value
        };
        }
}));*/
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/signup',require('./routes/users.js'));

app.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname +'/public/dashboard.html'));
})


app.listen(process.env.PORT || 5000, function () {
    console.log("SERVER 5000 HAS STARTED");
});