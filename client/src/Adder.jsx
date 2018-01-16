import React, { Component } from 'react';

// Adder component - represents the component that adds students to a list
class Adder extends Component {
	constructor(props) {
		super(props);
		this.state = {"students": []};
	}

	handleAdd(event){
		event.preventDefault();
		var studentName = this.refs.nameInput.value.trim().toUpperCase();

		// Check if student name already exists
		let isNotAlreadyExisting = this.state.students.filter(x => x.name === studentName).length === 0;

		if(isNotAlreadyExisting){
			let students = this.state.students;
			students.push({"id": studentName, "name": studentName});
			this.setState({"students": students});
			this.refs.nameInput.value = "";
		} else {
			alert("Name already exists");
		}
	}

	handleRemove(event){
		let studentName = event.target.getAttribute('data-name').trim();
		let students = this.state.students.filter(x => x.name !== studentName);
		this.setState({"students": students});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleAdd.bind(this)}>
					<div className="form-group">
						<div className="input-group mb-3">
							<input type="text" className="form-control" id="nameInput" ref="nameInput" placeholder="Enter Name Here" style={{"textTransform": "uppercase"}} required/>
							<div className="input-group-append">
								<button className="btn btn-outline" type="submit">+</button>
							</div>
						</div>
					</div>
				</form>
				<form onSubmit={this.props.onSubmit}>
					<div className="form-group">
						<div className="input-group mb-3">
							<ul id="studentList" className="list-group">
								{this.state.students.map((student) => (
									<li key={student.name} className="list-group-item d-flex justify-content-between">
									{student.name}
									&nbsp;&nbsp;
									<button data-name={student.name} type="button" className="btn btn-warning badge badge-warning" onClick={this.handleRemove.bind(this)}>Remove</button>
									</li>
									)
								)}
							</ul>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}

export default Adder;