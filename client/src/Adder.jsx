import React, { Component } from 'react';

// Adder component - represents the component that adds students to a list
class Adder extends Component {
	constructor(props) {
		super(props);
		this.state = {"students": []};
	}

	titleCase(str) {
		return str.toLowerCase().split(' ').map((word) => word.replace(word[0], word[0].toUpperCase())).join(' ');
	}

	handleAdd(event){
		event.preventDefault();
		var studentId = this.refs.idInput.value.trim();
		var studentName = this.refs.nameInput.value.trim();
		
		studentId = this.titleCase(studentId);
		studentName = this.titleCase(studentName);

		// Check if student name already exists
		let isNotAlreadyExisting = this.state.students.filter(x => x.name === studentName).length === 0;

		if(isNotAlreadyExisting){
			let students = this.state.students;
			students.push({"id": studentId, "name": studentName});
			this.props.onStudentsChanged(students);
			this.setState({"students": students});
			this.refs.idInput.value = "";
			this.refs.nameInput.value = "";
			this.refs.idInput.focus();
		} else {
			alert("Name already exists");
		}
	}

	reset() {
		this.props.onStudentsChanged([]);
		this.setState({"students": []});
		this.refs.idInput.value = "";
		this.refs.nameInput.value = "";
	}

	handleRemove(event){
		let studentName = event.target.getAttribute('data-name').trim();
		let students = this.state.students.filter(x => x.name !== studentName);
		this.props.onStudentsChanged(students);
		this.setState({"students": students});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleAdd.bind(this)}>
					<div className="form-row">
						<div className="col-4">
							<input type="text" className="form-control" id="idInput" ref="idInput" placeholder="Index No" style={{"textTransform": "capitalize"}} required/>
						</div>
						<div className="col-8">
							<input type="text" className="form-control" id="nameInput" ref="nameInput" placeholder="Name" style={{"textTransform": "capitalize"}} required/>
							<button type="submit" className="sr-only"/>
						</div>
					</div>
				</form>
				<br/>
				<form onSubmit={this.props.onSubmit}>
					<div className="form-group">
						<div className="input-group mb-3">
							<ul id="studentList" className="list-group">
								{this.state.students.map((student) => (
									<li key={student.name} className="list-group-item d-flex justify-content-between">
									{student.name}
									&nbsp;&nbsp;&nbsp;&nbsp;
									<button data-name={student.name} type="button" className="btn btn-danger badge badge-danger" onClick={this.handleRemove.bind(this)}>x</button>
									</li>
									)
								)}
							</ul>
						</div>
					</div>
					<button type="submit" className={"btn btn-primary " + (this.props.submitEnabled ? "" : "disabled")} disabled={!this.props.submitEnabled}>Submit</button>
				</form>
			</div>
		);
	}
}

export default Adder;