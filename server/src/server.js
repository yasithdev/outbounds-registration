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

// Tell express to use the body-parser middleware for JSON
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "outbounds";
var db;

var groupLocks = [];

// Initialize connection once
MongoClient.connect(url, function(error, client) {
	assert.equal(null, error);
	db = client.db(dbName);
	assert.notEqual(null, db);

	// Start the application server after the database connection is ready
	server.listen(appPort, () => console.log(`Server started on Port ${appPort}`));
});

// Endpoint - Get all groups
app.get('/api/groups', function(request, response) {
	console.log(`Groups Requested`);

	// Get all group counts from db
	db.collection("students").aggregate([{ $group: {_id: "$group_id", count: {$sum: 1} } }]).toArray(function(error, counts) {
		assert.equal(null, error);
		console.log(counts);
		
		// Do a left join equivalent and update the response with the result
		db.collection("groups").find({}).toArray((e, groups) => {
			assert.equal(null, e);
			groups = groups.map((group) => ({
				"_id": group._id, 
				"color": group.color,
				"count": (counts.filter((e) => e._id === group._id).map((x) => x.count)[0] || 0)
			}))
			console.log(groups);
			response.json({"groups": groups});
		});
	});
});

// Endpoint - Add new group
app.post('/api/groups', function(request, response) {
	console.log(`Add new Group Requested`);
	
	// Add new group to db
	let name = request.body.name;
	let color = request.body.color;
	db.collection("groups").insertOne({'_id': name, 'color': color}, function(error, result) {
		assert.equal(null, error);
		let message = `Inserted group "${name}"`;
		console.log(message);
		response.json({"message": message});
	});
});

// Endpoint - Add new student with group
app.post('/api/students', function(request, response) {
	console.log(`Add students with groups`);
	
	// Add new students to db
	let students = request.body.students;
	console.log(students);
	db.collection("students").insert(students, function(error, result) {
		assert.equal(null, error);
		let message = `Added students to group"`;
		console.log(message);
		response.json({"message": message});

		// Send update notification to all listening connections
		io.emit('group changed', {});
	});
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	// Notify user to update its groups
	socket.emit('group refresh');
	
	// Notify the current locks to user
	socket.emit('group lock multiple', groupLocks.map((e) => e.data));

	socket.on('disconnect', function(){
		console.log('user disconnected');
		var filtered = groupLocks.filter((e) => e.id !== socket.id);
		var toRemove = groupLocks.filter((e) => e.id === socket.id);
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
