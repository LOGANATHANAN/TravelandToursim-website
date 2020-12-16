const express= require('express')
const path=require('path');
//const expressValidator=require('express-validator');
const router=express.Router();
const mongoose=require('mongoose');
let user=require('../models/user');
const bcrypt=require('bcryptjs');

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/signup.html'));
})

router.post('/',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const password2=req.body.password2;

    let newuser= new user({
        name:name,
        email:email,
        password:password
    });
   bcrypt.genSalt(10,function(err,salt){
       bcrypt.hash(newuser.password,salt,function(err,hash){
           if(err){
               console.log(err);
           }
           else{
               newuser.password=hash;
               newuser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    else{
                        console.log('Data has been pushed');
                        res.redirect('/dashboard');
                    }
               });
           }
       });
   })
   
});

module.exports=router;

