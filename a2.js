/*********************************************************************************
 * WEB322 – Assignment 3 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. 
 * 
 * Name: Jihyun Nam  Student ID: 130641210 Date: Oct 7th, 2022
 **********************************************************************************/
/* ==================================================
File Description :  
==================================================== */

// Declare the variable "officeData" to call all functions that I created in "./modules/officeData.js"
const officeData = require("./modules/officeData.js");

officeData.initialize().then(function(msg) {

    // Show the result of reading employees and classes files
    console.log(msg);

    officeData.getAllEmployees().then(function(value) {

        console.log("Successfully retrieved "  + value.length + " employees!");

    }) .catch(function(err) {

        console.log(err);

    });

    officeData.getClasees().then(function(value) {

        console.log("Successfully retrieved "  + value.length + " classes!");

    }) .catch(function(err) {

        console.log(err);

    });

    officeData.getEAs().then(function(value) {

        console.log("Successfully retrieved "  + value.length + " EAs!");

    }) .catch(function(err) {

        console.log(err);

    });

    officeData.getPartTimers().then(function(value) {

        console.log("Successfully retrieved "  + value.length + " Part Timers!");

    }) .catch(function(err) {

        console.log(err);

    });

}) .catch(function(err) {

    console.log(err);

});