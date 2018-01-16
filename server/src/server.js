'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const assert = require('assert');

// Create a new instance of express
const app = express();
const appPort = 5000;

// Tell express to use the body-parser middleware for JSON
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "outbounds";
var db;

// Initialize connection once
MongoClient.connect(url, function(error, client) {
    assert.equal(null, error);
    db = client.db(dbName);
    assert.notEqual(null, db);

    // Start the application after the database connection is ready
    app.listen(appPort, () => console.log(`Server started on Port ${appPort}`));
});

// Endpoint - Get all groups
app.get('/api/groups', function(request, response) {
    console.log(`Groups Requested`);
    
    // Get all groups from db and return response
    db.collection("students").aggregate([{ $group: {_id: "$group_id", count: {$sum: 1} } }]).toArray(function(error, docs) {
        console.log(docs);
        assert.equal(null, error);
        response.json({"groups": docs});
    });
});

// Endpoint - Add new group
app.post('/api/groups', function(request, response) {
    console.log(request.body);
    let name = request.body.name;
    
    // Add new group to db
    db.collection("groups").insertOne({'_id': name}, function(error, result) {
        assert.equal(null, error);
        let message = `Inserted group "${name}"`;
        console.log(message);
        response.json({"message": message});
    });
});

// Endpoint - Add new student with group
app.post('/api/students', function(request, response) {
    console.log(request.body);
    let id = request.body.id;
    let name = request.body.name;
    let group_id = request.body.group_id;
    
    // Add new student to db
    db.collection("students").insertOne({'_id': id, 'name': name, 'group_id': group_id}, function(error, result) {
        assert.equal(null, error);
        let message = `Added student to group "${id}" -> "${group_id}"`;
        console.log(message);
        response.json({"message": message});
    });
});
