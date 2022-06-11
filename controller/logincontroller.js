const  config = require('../dbconfig/db_connection');
const con=require('../dbconfig/db_connection');
const sql=require('mssql');
const express=require('express');
 const  bodyParser = require('body-parser');
 const jwt = require('jsonwebtoken');
 const app=express(); 
 require('dotenv').config();
//Register user api 
async  function  register(req,res) {
   console.log(req.body);
   try {
    let  addinput = await(await con).request()
     .input('name', sql.VarChar, req.body.name)
     .input('gender',sql.Char,req.body.gender)
     .input('city',sql.VarChar,req.body.city)
     .input('email', sql.NVarChar, req.body.email)
    .input('passward', sql.VarChar, req.body.passward)
    .query(`insert into datatable (name,gender,city,email,passward)values(@name,@gender,@city,@email,@passward)`);
      res.json('successfully user registered');
   }
   catch (err) {
     console.log(err);
   }}
 //user login code
 async  function  login(req,res) {
   console.log(req.body)
   try {
      let  input =await (await con).request().query(`SELECT email,passward from datatable where email='${req.body.email}'`);
     let email=req.body.email;
     let password=req.body.passward;
     console.log(input)
     if(input.recordset)
     {
       if(email==input.recordset[0].email){
         if(password==input.recordset[0].passward)
         {
           console.log(  process.env.JWT_TOKEN);
           const user={}
           const token = jwt.sign(
             { password:password, email },
          process.env.JWT_TOKEN,      
              {       
              expiresIn: "10min",
             });
           user.token = token;
            res.json(token );
             }
       else
       {
         res.json("invalid email or password");
       }
     }
     else
     {
       res.json("user doesn't exist");
   }}}
   catch (err) {
     console.log(err);
     res.json("nothing happend");
   }}
 async  function  welcome(req,res) {
//  res.status(200);
 try {
    let  input =await (await con).request().query(`SELECT * from datatable where email='${req.body.email}'`);
      res.send(input.recordset);
  }
  catch (error) {
    console.log(error);
  }};
 module.exports = {
  register,login,welcome
  }