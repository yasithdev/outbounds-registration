import React, { Component } from 'react';
import './App.css';

import Adder from './Adder.jsx';
import GroupSelector from './GroupSelector.jsx';
import Request from 'request';

// App component - represents the whole app
class App extends Component {

	constructor(props){
		super(props);
		this.serverAddress = "http://localhost:5000";
		this.state = {"groups": [], "status": 0, "selectedGroup" : null};

		// Configure Message Handling
		this.socket = require('socket.io-client')(this.serverAddress);
		// On socket connect
		this.socket.on('connect', () => {
			console.log(`Connection Established`);
			this.refs.groupSelector.setState({"selectedGroup" : null});
			this.setState({"status": 1});
		});
		// On socket disconnect
		this.socket.on('disconnect', () => {
			console.log(`Connection Closed`);
			this.refs.groupSelector.setState({"selectedGroup" : null});
			this.setState({"status": 0});
		});
		// On group refresh
		this.socket.on('group refresh', () => {
			console.log(`Group Refresh Notified`);
			this.updateGroups();
		});
		// On group lock init
		this.socket.on('group lock multiple', (array) => {
			console.log(`Group Lock Multiple Notified`);
			this.refs.groupSelector.lockGroups(array);
		});
		// On group lock
		this.socket.on('group lock', (id) => {
			console.log(`Group Lock Notified`);
			this.refs.groupSelector.lockGroup(id);
		});
		// On group unlocked
		this.socket.on('group unlock', (id) => {
			console.log(`Group Unlock Notified`);
			this.refs.groupSelector.unlockGroup(id);
		});
	}

	updateGroups(){
		Request(`${this.serverAddress}/api/groups`, (error, response, body) => {
			if (response) {
				console.log(`Status: ${response.statusCode}`);
				// Check status code and take action
				if (response.statusCode === 200){
					let result = JSON.parse(body).result.groups;
					this.setState({"groups": result});
				} else {
					console.log(`Error: ${body.error}`);
				}
			}
			else if (error) console.log(`Error: ${error}`);
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let group = this.state.selectedGroup;
		if (group === null){
			alert("Please select a group");
		} else {
			let students = this.refs.adder.state.students;
			Request({
				method: "POST",
				url: `${this.serverAddress}/api/students`, 
				json: true,
				body: {group: group, students: students}
			}, (error, response, body) => {
				if (response) console.log(`Status: ${response.statusCode}`);
				if (error) console.log(`Error: ${error}`);
				// Check status code and take action
				if (response.statusCode === 200){
					this.refs.adder.reset();
				} else {
					console.log(`Error: ${body.error.errmsg}`);
					alert(`One or more students have already been registered!`);
				}
			});
		}
	}

	handleGroupChanged(id){
		let prevId = this.state.selectedGroup;
		if (prevId !== null) this.socket.emit('group unlock', prevId);
		this.setState({"selectedGroup": id});
		this.socket.emit('group lock', id);
	}

	handleStudentsChanged(students){
		this.setState({"students": students});
	}

	render() {
		return (
			<div className="container">
			<div className="jumbotron text-center">
			<h1>Valianz 2018</h1>
			<h2>Registration</h2>
			</div>
			<div className="row">
			<div className="col-7">
			<div className="card">
			<div className="card-header"><h5><strong>Add Students</strong></h5></div>
			<div className="card-body">
			<Adder ref="adder" onSubmit={this.handleSubmit.bind(this)} submitEnabled={this.state.selectedGroup !== null} onStudentsChanged={this.handleStudentsChanged.bind(this)}/>
			</div>
			</div>
			</div>
			<div className="col-5">
			<div className="card">
			<div className="card-header d-flex justify-content-between align-items-center">
			<h5><strong>Groups</strong></h5>
			<span className={`badge badge-pill badge-${this.state.status ? "success" : "danger"}`}>&nbsp;</span>
			</div>
			<div className="card-body">
			<GroupSelector ref="groupSelector" groups={this.state.groups} onGroupChanged={this.handleGroupChanged.bind(this)}/>
			</div>
			</div>
			</div>
			</div>
			</div>
			);
	}
}

export default App;