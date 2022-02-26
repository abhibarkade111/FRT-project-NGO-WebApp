const express = require('express')
var sql = require("mssql");
const fs = require('fs');
const { Console } = require('console');
const app = express()
const http = require('http').createServer(app)
var bodyParser = require('body-parser');
const { strictEqual } = require('assert');
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
const users = {};

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html')
})

app.get('/partner', (req, res) => {
    res.sendFile(__dirname + '/public/partner.html')
})

app.get('/request-food', (req, res) => {
    res.sendFile(__dirname + '/public/requestfood.html')
})

app.get('/request-cloth', (req, res) => {
    res.sendFile(__dirname + '/public/requestcloth.html')
})
app.get('/volunteer', (req, res) => {
    res.sendFile(__dirname + '/public/volunteer.html')
})
app.get('/donate', (req, res) => {
    res.sendFile(__dirname + '/public/donate.html')
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html')
})

var dbConfig = {
    server: "ngowebappserver.database.windows.net", // Use your SQL server name
    database: "NGOWebData", // Database to connect to
    user: "abhibarkade", // Use your username
    password: "Abhi@123", // Use your password
    port: 1433,
    options: {
          encrypt: true
      }
   };

   const conn = new sql.ConnectionPool(dbConfig);
   conn.connect();

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        console.log(err);
    }
    else
    {
       console.log("Connection established.");
    }
});

app.post( '/contact', (req , res) => {
 
    var suggestions = req.body.suggestions
 
     const request = conn.request()
     request.input('myval', sql.VarChar, suggestions)
     request.query('insert into suggestionsTable (suggestions) values (@myval)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/contact.html')
 })
 
 });

app.post( '/contactMain', (req , res) => {
 
   var fullName = req.body.fullName;
   var mobileNo = req.body.mobileNo;
   var email = req.body.email;
   var city = req.body.city;
   var category = req.body.category;
   var details = req.body.details;


    const request = conn.request()
    request.input('name', sql.VarChar, fullName)
    request.input('mob', sql.VarChar, mobileNo)
    request.input('email', sql.VarChar, email)
    request.input('city', sql.VarChar, city)
    request.input('category', sql.VarChar, category)
    request.input('details', sql.VarChar, details)

    request.query('insert into contact (fullName,mobileNo,email,city,category,details) values (@name,@mob,@email,@city,@category,@details)', (err, result) => {
    if(err){
        console.log(err);
    }
    console.dir(result)
    res.sendFile(__dirname + '/public/contact.html')
})

});

app.post( '/partner', (req , res) => {
 
    var orgName = req.body.orgName;
    var address = req.body.address;
    var pincode = req.body.pincode;
    var city = req.body.city;
    var fName = req.body.fName;
    var mobileNo = req.body.mobileNo;
    var email = req.body.email;
    var details = req.body.details;
 
    // console.log("name"+fullName+" mobile"+mobileNo+" e"+email+" c"+city+" ca"+category+" de"+details);
 
     const request = conn.request()
     request.input('orgName', sql.VarChar, orgName)
     request.input('address', sql.VarChar, address)
     request.input('pin', sql.VarChar, pincode)
     request.input('city', sql.VarChar, city)
     request.input('fName', sql.VarChar, fName)
     request.input('mob', sql.VarChar, mobileNo)
     request.input('email', sql.VarChar, email)
     request.input('details', sql.VarChar, details)
 
     request.query('insert into partner (organizationName,Address,Pincode,City,FullName,MobileNo,Email,Details) values (@orgName,@address,@pin,@city,@fName,@mob,@email,@details)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/partner.html')
 })
 
 });

 app.post( '/request-food', (req , res) => {
 
    var orgName = req.body.orgName;
    var website = req.body.website;
    var pincode = req.body.pincode;
    var city = req.body.city;
    var address = req.body.address;
    var mobileNo = req.body.mobileNo;
    var email = req.body.email;
    var details = req.body.details;
 
    // console.log("name"+fullName+" mobile"+mobileNo+" e"+email+" c"+city+" ca"+category+" de"+details);
 
     const request = conn.request()
     request.input('orgName', sql.VarChar, orgName)
     request.input('web', sql.VarChar, website)
     request.input('pin', sql.VarChar, pincode)
     request.input('city', sql.VarChar, city)
     request.input('address', sql.VarChar, address)
     request.input('mob', sql.VarChar, mobileNo)
     request.input('email', sql.VarChar, email)
     request.input('details', sql.VarChar, details)
 
     request.query('insert into RequestFood (organizationName,WebsiteLink,Pincode,City,Address,MobileNo,Email,Details) values (@orgName,@web,@pin,@city,@address,@mob,@email,@details)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/requestfood.html')
 })
 
 });

 app.post( '/request-cloth', (req , res) => {
 
    var orgName = req.body.orgName;
    var website = req.body.website;
    var pincode = req.body.pincode;
    var city = req.body.city;
    var address = req.body.address;
    var mobileNo = req.body.mobileNo;
    var email = req.body.email;
    var details = req.body.details;
 
    // console.log("name"+fullName+" mobile"+mobileNo+" e"+email+" c"+city+" ca"+category+" de"+details);
 
     const request = conn.request()
     request.input('orgName', sql.VarChar, orgName)
     request.input('web', sql.VarChar, website)
     request.input('pin', sql.VarChar, pincode)
     request.input('city', sql.VarChar, city)
     request.input('address', sql.VarChar, address)
     request.input('mob', sql.VarChar, mobileNo)
     request.input('email', sql.VarChar, email)
     request.input('details', sql.VarChar, details)
 
     request.query('insert into RequestCloth (organizationName,WebsiteLink,Pincode,City,Address,MobileNo,Email,Details) values (@orgName,@web,@pin,@city,@address,@mob,@email,@details)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/requestcloth.html')
 })
 
 });

 app.post( '/volunteer', (req , res) => {
 
    var fName = req.body.fName;
    var lName = req.body.lName;
    var instiName = req.body.instiName;
    var address = req.body.address;
    var mobileNo = req.body.mobileNo;
    var email = req.body.email;
    var details = req.body.details;
 
    // console.log("name"+fullName+" mobile"+mobileNo+" e"+email+" c"+city+" ca"+category+" de"+details);
 
     const request = conn.request()
     request.input('fName', sql.VarChar, fName)
     request.input('lName', sql.VarChar, lName)
     request.input('inName', sql.VarChar, instiName)
     request.input('address', sql.VarChar, address)
     request.input('mob', sql.VarChar, mobileNo)
     request.input('email', sql.VarChar, email)
     request.input('details', sql.VarChar, details)
 
     request.query('insert into Volunteer (FirstName,LastName,InstituteName,Address,MobileNo,Email,Details) values (@fName,@lName,@inName,@address,@mob,@email,@details)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/volunteer.html')
 })
 
 });

 app.post( '/donate', (req , res) => {
 
    var category = req.body.category;
    var orgName = req.body.orgName;
    var address = req.body.address;
    var pincode = req.body.pincode;
    var city = req.body.city;
    var fName = req.body.fName;
    var mobileNo = req.body.mobileNo;
    var email = req.body.email;
    var details = req.body.details;
 
    // console.log("name"+fullName+" mobile"+mobileNo+" e"+email+" c"+city+" ca"+category+" de"+details);
 
     const request = conn.request()
     request.input('category', sql.VarChar, category)
     request.input('orgName', sql.VarChar, orgName)
     request.input('address', sql.VarChar, address)
     request.input('pin', sql.VarChar, pincode)
     request.input('city', sql.VarChar, city)
     request.input('fName', sql.VarChar, fName)
     request.input('mob', sql.VarChar, mobileNo)
     request.input('email', sql.VarChar, email)
     request.input('details', sql.VarChar, details)
 
     request.query('insert into Donate (Category,organizationName,Address,Pincode,City,FullName,MobileNo,Email,Details) values (@category,@orgName,@address,@pin,@city,@fName,@mob,@email,@details)', (err, result) => {
     if(err){
         console.log(err);
     }
     console.dir(result)
     res.sendFile(__dirname + '/public/donate.html')
 })
 
 });