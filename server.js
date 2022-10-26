/*********************************************************************************
 * WEB322 – Assignment 4 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. 
 * 
 * Name: Jihyun Nam  Student ID: 130641210 Date: Oct 15th, 2022
 * 
 * Online (Cyclic) Link:  https://uninterested-tux-crab.cyclic.app/
 **********************************************************************************/
/* ==================================================
File Description :  
==================================================== */

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const app = express();
const datas = require("./modules/officeData.js");

// after the http server starts listening for requests, call this function
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Assignment PART2: Adding body-parser
// built in express "static" middleware to dientify our newly created "public" folder as a source for static files
app.use(express.static(__dirname + '/public'));

// call initialize method from officeData.js
//------------------------------------------------------------------
// var HTTP_PORT = process.env.PORT || 8080;
datas.initialize() .then(() => {
  app.listen(HTTP_PORT, onHttpStart); 
}).catch(err => {
  console.log(err + "No Results!");
})
//------------------------------------------------------------------

//---------------------------------------------------------------------
// setup a 'route' to listen on the default url path
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  });
  
  app.get("/audio", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/audio.html"));
  });
  
  app.get("/video", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/video.html"));
  });
  
  app.get("/table", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/table.html"));
  });

  app.get("/list", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/list.html"));
  });

  // Assignment PART2 : add routes for "storefront.html"
  app.get("/storefront", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/storefront.html"));
  });
//---------------------------------------------------------------------

//---------------------------------------------------------------------
//employee by num value route
app.get("/employees/:num", function (req, res) {
    datas.getEmployeeByNum(req.params.num).then((data) => {
    
      res.json(data);

    }) .catch((err) => {

      console.log(err);
      res.json(err);

    })

  });
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // partTimer value route
  app.get("/PartTimer", function (req, res) {
    datas.getPartTimers().then((data) => {

      res.json(data);

    }).catch((err) => {

      console.log(err);
      res.json(err + "No Results!");

    })

  }); 
//---------------------------------------------------------------------

// Assignment PART2:
// If you are simply using text form data, you can use the built in “express.urlencoded” middleware 
// to handle regular text submissions and access the data on req.body
app.use(express.urlencoded({ extended: true }));

//------------------------------------------------------------------
// no matching route
app.use(function (req, res) {
    res.status(404).send("Error! Page NOT Found!");
  })
//------------------------------------------------------------------
