import React, { Component } from 'react';

// Group component - represents a single group
class Group extends Component {

	constructor(props){
		super(props);
		this.state = {"locked": false};
	}

	render() {
		return (
			<a className={"list-group-item list-group-item-action d-flex justify-content-between align-items-center " + (this.props.active ? "active" : "")} data-id={this.props.group._id} onClick={this.props.onClick} onDblClick={this.props.onDblClick} style={{"cursor": "pointer"}}>
				<span className={"badge badge-pill " + (this.state.locked ? "badge-warning" : "badge-success")}>&nbsp;</span>
				{this.props.group._id}
				<span className="badge badge-dark badge-pill" style={{"font-size": "0.9rem"}}>{this.props.group.count}</span>
			</a>
			);
	}
}

export default Group;