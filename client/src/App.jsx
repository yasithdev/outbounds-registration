import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Adder from './Adder.jsx';
import GroupSelector from './GroupSelector.jsx';

// App component - represents the whole app
class App extends Component {

	handleSubmit(event){
		event.preventDefault();
		let group = this.refs.groupSelector.state.selectedGroup;
		let students = this.refs.adder.state.students;
		let mappedStudents = students.map((student) => ({"id": student.id, "name": student.name, "group_id": group}));
		console.log(mappedStudents);
		// POST the mapped students into "/api/students" endpoint
	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron text-center">
					<h1>Valianz 2018 - Registration</h1>
				</div>
				<div className="row">
					<div className="col-8">
						<h2>Add Students</h2>
						<Adder ref="adder" onSubmit={this.handleSubmit.bind(this)}/>
					</div>
					<div className="col-4">
						<h2>Groups</h2>
						<GroupSelector ref="groupSelector"/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;