/*********************************************************************************
 * WEB322 – Assignment 4 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * * No part of this assignment has been copied manually or electronically from any other source 
 * * (including web sites) or distributed to other students. 
 * 
 * Name: Jihyun Nam  Student ID: 130641210 Date: Oct 15th, 2022
 **********************************************************************************/
/* ==================================================
    File Description :  This module will be responsible for reading the employees.json and classes.json files. 
====================================================*/

//fs module provides an API for interacting with the file system
const fs = require("fs");

// Create a class called "Data"
class Data {

    // Single constructor which takes two parameters : employees and classes
    constructor(employees = "", classes = "") {
        this.employees = employees;
        this.classes = classes;
    }

}

// Declare the variable "dataCollection" beneath the class and assign it to "NULL"
let dataCollection = null;

// Declare data arrays
let employeeDataFromFile = [];
let classDataFromFile = [];

// Export functions
module.exports = {

    // Retrieve data from json files
    initialize: function() {
        let promise = new Promise(function(resolve, reject) {

            // Read employees.json
            fs.readFile('./data/employees.json', 'utf8', (err, employeesData) => {

                if (err) {

                    reject("Error! Unable to read employees.json");
                    return;

                } else {

                    // Parse data into employees array
                    employeeDataFromFile = JSON.parse(employeesData);
                    // Debugging Code //
                    // console.log("Succuss! employees.json loaded!");

                    // Read departments.json
                    fs.readFile('./data/classes.json', 'utf8', (err, classesData) => {

                        if (err) {

                            reject("Error! Unable to read classes.json");
                            return;

                        } else {

                            // Parse data into classes array
                            classDataFromFile = JSON.parse(classesData);
                            // Debugging Code //
                            // console.log("Succuss! classes.json loaded!");

                            dataCollection = new Data(employeeDataFromFile, classDataFromFile);
                            // Invoke the "resolve()" method for the promise to communicate back to a2.js that
                            // the operation was a success
                            resolve('Initialization successful!');
                            
                        }
                    });
                    
                }
            });

        });

        return promise;
    },

    // Return all employees
    getAllEmployees : function() {

        let promise = new Promise(function(resolve, reject) {

            if (dataCollection.employees.length > 0) {

                resolve(dataCollection.employees);

            } else {

                reject('No results returned!');
                return;

            }

        });
        
        return promise;
    },

    // Return EA
    getEAs : function() {

        let employeesEA = []; 

        let promise = new Promise(function(resolve, reject) {

            for (let i = 0; i < dataCollection.employees.length; i++) {

                // Add employee whose EA is true  to employeesEA array
                if (dataCollection.employees[i].EA == true) {

                    employeesEA.push(dataCollection.employees[i]);

                }

            }

            if (employeesEA.length > 0) {

                resolve(employeesEA);

            } else {

                reject("No results returned!");
                return;
            }

        });

        return promise;
    
    },

    // Return classes
    getClasees : function() {

        let promise = new Promise(function(resolve, reject) {

            if (dataCollection.classes.length > 0) {

                resolve(dataCollection.classes);

            } else {

                reject('No results returned!');
                return;

            }

        });
        
        return promise;
    },

    // Return part timers
    getPartTimers : function() {

        let partTimers = []; 

        let promise = new Promise(function(resolve, reject) {

            for (let i = 0; i < dataCollection.employees.length; i++) {

                // Add employees whose status is Part Time to partTimers array
                if (dataCollection.employees[i].status == "Part Time") {

                    partTimers.push(dataCollection.employees[i]);

                }

            }

            if (partTimers.length > 0) {

                resolve(partTimers);
                
            } else {

                reject("No results returned!");
                return;

            }
            
        });

        return promise;
    },

    //------------------------------------------------
    // Assignment 3
    //------------------------------------------------
    // get employee by num
    getEmployeeByNum : function (num) {
        
        var matchEmployeeByNum = [];

        let promise = new Promise(function(resolve, reject) {

            for (let i = 0; i < dataCollection.employees.length; i++) {

                if (dataCollection.employees[i].employeeNum == num) {

                    matchEmployeeByNum.push(dataCollection.employees[i]);

                }

            }

            if (matchEmployeeByNum.length > 0) {

                resolve(matchEmployeeByNum);

            } else {

                var errMsg = "No Results Returned! getEmployeeByNum function does not have matched data!"
                reject(errMsg);
                return;

            }

        });
        
        return promise;

    },

};