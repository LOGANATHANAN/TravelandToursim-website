require('dotenv').config()
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');

const db=process.env.DATABASE_URL;
const connect = mongoose
  .connect(db, { useFindAndModify: false,useUnifiedTopology:true,useNewUrlParser:true })
  .then(() => console.log("Mondo db connected...."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname ,'/public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/signup',require('./routes/users.js'));

app.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname +'/dashboard.html'));
})


app.listen(process.env.PORT || 8000, function () {
    console.log("SERVER 8000 HAS STARTED");
});