'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const assert = require('assert');
const socketio = require('socket.io');

// Create a new instance of express
const app = express();
const server = require('http').createServer(app);
const io = socketio(server);
const appPort = 5000;

// HTTP Status Codes
const BAD_REQUEST = 400;
const SERVICE_UNAVAILABLE = 503;
const OK = 200;

// Tell express to use the body-parser middleware for JSON
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MongoDB Connection
const mongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const mongoDbName = "outbounds";

// Connect to MongoDB Instance
mongoClient.connect(mongoUrl, function(error, client) {
    assert.equal(null, error);
    db = client.db(mongoDbName);
    assert.notEqual(null, db);
    // Start the App Server
    server.listen(appPort, () => console.log(`Server started on Port ${appPort}`));
});

// State variables
var db;
var groupLocks = [];

// Response function
var setResponse = function(request, response, stc, err, res) {
    console.log(`[${request.method}] ${request.path} - ${stc}`);
    response.status(stc);
    response.json({"error": err, "result": res});
};

// Endpoint - Get all groups
app.get('/api/groups', function(request, response) {
    // Response Variables ----------
    let err = null, res = null, stc = OK;
    // Process ---------------------
    // Get all group counts from db
    db.collection("students").aggregate([{ $group: {_id: "$group_id", count: {$sum: 1} } }]).toArray(function(error, counts) {
        err = error;
        if (err) {
            stc = SERVICE_UNAVAILABLE;
            setResponse(request, response, stc, err, res);
        }
        else {
            // Do a left join equivalent and update the response with the result
            db.collection("groups").find({}).toArray((e, groups) => {
                err = error;
            if (err) {
                stc = SERVICE_UNAVAILABLE;
                setResponse(request, response, stc, err, res);
            }
            else {
                groups = groups.map((group) => ({
                        "_id": group._id,
                        "color": group.color,
                        "count": (counts.filter((e) => e._id === group._id).map((x) => x.count)[0] || 0)
            }));
                res = {"groups" : groups};
                setResponse(request, response, stc, err, res);
            }
        });
        }
    });
});

// Endpoint - Add new group
app.post('/api/groups', function(request, response) {
    let groups = request.body.groups.map((group) => ({'_id': group.name, 'color': group.color}));
    let name = request.body.name || "";
    let color = request.body.color || "";
    // Response Variables ----------
    let err = null, res = null, stc = OK;
    // Process ---------------------
    if(groups.length == 0 ||name === "" || color === "") {
        stc = BAD_REQUEST;
        err = "Request not in proper JSON format";
        setResponse(request, response, stc, err, res);
    }
    else {
        db.collection("groups").insert(groups, function(error, result) {
            err = error;
            res = result;
            if(err) stc = SERVICE_UNAVAILABLE;
            setResponse(request, response, stc, err, res);
        });
    }
});

// Endpoint - Add new student with group
app.post('/api/students', function(request, response) {
    let group = request.body.group || "";
    let students = request.body.students || [];
    // Response Variables ----------
    let err = null, res = null, stc = OK;
    // Process ---------------------
    if(group === "" || students.length === 0) {
        stc = BAD_REQUEST;
        err = "Request not in proper JSON format";
        setResponse(request, response, stc, err, res);
    }
    else {
        students = students.map(function(student){
            return {
                "_id": student.id,
				"name": student.name,
				"group_id": group
            };
        });
        db.collection("students").insert(students, function(error, result) {
            err = error;
            res = {"students": result};
            if(err) stc = SERVICE_UNAVAILABLE;
            setResponse(request, response, stc, err, res);
            io.emit('group refresh', {});
        });
    }
});

io.set('heartbeat timeout', 5000);
io.set('heartbeat interval', 2000);

io.on('connection', function(socket){
    console.log('a user connected');
    // Notify user to update its groups
    socket.emit('group refresh');
    // Notify the current locks to user
    socket.emit('group lock multiple', groupLocks.map((e) => e.data));
    // Notify other users to unlock groups when a user disconnects
    socket.on('disconnect', function(){
        console.log('user disconnected');
        let filtered = groupLocks.filter((e) => e.id !== socket.id);
        let toRemove = groupLocks.filter((e) => e.id === socket.id);
        groupLocks = filtered;
        // Notify all users except sender to unlock the sender's lock
        if(toRemove.length == 1) socket.broadcast.emit('group unlock', toRemove[0].data);
    });

    socket.on('group lock', function(data){
        // Add lock to groupLocks
        groupLocks.push({id: socket.id, data: data});
        // Notify all users of group lock except sender
        socket.broadcast.emit('group lock', data);
    });

    socket.on('group unlock', function(data){
        // Remove lock from groupLocks
        groupLocks = groupLocks.filter((e) => e.data !== data);
        // Notify all users of group unlock except sender
        socket.broadcast.emit('group unlock', data);
    });
});
