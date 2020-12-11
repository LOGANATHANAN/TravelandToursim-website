const express= require('express')
const router=express.Router();
const mongoose=require('mongoose');
const expressValidator=require('express-validator');
const flash=require('connect-flash');

let user=require('../models/user');
const bcrypt=require('bcryptjs');
router.post('/signup',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const password2=req.body.password2;
    
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('email','Email is requires').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','Passord is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);

    let errors=req.validationErrors();

    if(errors){
        res.sendFile('./public/signup.html');
    
    }
    else{
    let newuser= new user({
        name:name,
        email:email,
        password:password
    });
}
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
                        req.flash('success','You have registred sucessfully');
                        res.redirect('./pubic/dashboard.html');
                    }
               });
           }
       });
   })
   
});

module.exports=router;

