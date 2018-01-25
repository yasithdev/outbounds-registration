import React, { Component } from 'react';

import './Group.css';

// Group component - represents a single group
class Group extends Component {

	render() {
		return (
			<a className={"list-group-item list-group-item-action d-flex justify-content-between align-items-center" + (this.props.active ? " active" : "") + (this.props.locked ? " locked" : "")}
			   data-id={this.props.group._id}
			   onClick={this.props.onClick}
			   onDoubleClick={this.props.onDoubleClick}
			   style={{"cursor": "pointer"}}>
				<span className={"badge badge-pill " + (this.props.group.color)}>&nbsp;</span>
				{this.props.group._id}
				<span className="badge badge-dark badge-pill" style={{"fontSize": "0.9rem"}}>{this.props.group.count}</span>
			</a>
			);
	}
}

export default Group;