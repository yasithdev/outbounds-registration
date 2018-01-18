import React, { Component } from 'react';
import './App.css';

import Adder from './Adder.jsx';
import GroupSelector from './GroupSelector.jsx';
import Request from 'request';

// App component - represents the whole app
class App extends Component {

	constructor(props){
		super(props);
		this.state = {"groups": [], "status": 0, "selectedGroup" : null};

		// Configure Message Handling
		this.socket = require('socket.io-client')('http://localhost:5000');
		this.socket.on('connect', () => {
			console.log(`Connection Established`);
			this.refs.groupSelector.setState({"selectedGroup" : null});
			this.setState({"status": 1});
		});
		this.socket.on('disconnect', () => {
			console.log(`Connection Closed`);
			this.refs.groupSelector.setState({"selectedGroup" : null});
			this.setState({"status": 0});
		});
		this.socket.on('group refresh', () => {
			console.log(`Group Refresh Notified`);
			// Get groups from server and update
			this.updateGroups();
		});
		this.socket.on('group lock multiple', (array) => {
			console.log(`Group Lock Multiple Notified`);
			// Lock the groups
			this.refs.groupSelector.lockGroups(array);
		});
		this.socket.on('group lock', (id) => {
			console.log(`Group Lock Notified`);
			// Lock the group
			this.refs.groupSelector.lockGroup(id);
		});
		this.socket.on('group unlock', (id) => {
			console.log(`Group Unlock Notified`);
			// Unlock the group
			this.refs.groupSelector.unlockGroup(id);
		});
	}

	updateGroups(){
		Request('http://localhost:5000/api/groups', (error, response, body) => {
			if (error) console.log('error:', error);
			if (response) console.log('statusCode:', response && response.statusCode);
			if (response.statusCode === 200 && body !== null){
				let groups = JSON.parse(body).groups;
				console.log('groups:',groups);
				this.setState({"groups": groups});
			}
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let group = this.state.selectedGroup;
		if (group === null){
			alert("Please select a group");
		} else {
			let students = this.refs.adder.state.students;
			let mappedStudents = students.map((student) => ({"_id": student.id, "name": student.name, "group_id": group}));
			Request({
				method: "POST", 
				url: 'http://localhost:5000/api/students', 
				json: true,
				body: {students: mappedStudents}
			}, (error, response, body) => {
				if (error) console.log('error: ', error);
				if (response) console.log('statusCode: ', response && response.statusCode);
				if (body) console.log('body: ', body)
				this.refs.adder.reset();
			});
		}
	}

	handleRequestDetails(event){
		event.preventDefault();
		// let group = event.target.getAttribute('data-id');
		// Show a modal dialog with all registered details
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

	renderModal = (groupId) => {
		return (
			<div>
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAllocations">Allocations</button>
				
				<div class="modal fade" id="Group Allocations" tabindex="-1" role="dialog" aria-labelledby="modalAllocations" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalTitle">{groupId}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
						</div>
						<div class="modal-body">
							{"All Content goes here"}
						</div>
					</div>
					</div>
				</div>
			</div>
			);
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
								<GroupSelector ref="groupSelector" groups={this.state.groups} onGroupChanged={this.handleGroupChanged.bind(this)} onRequestDetails={this.handleRequestDetails.bind(this)}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;