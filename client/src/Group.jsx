import React, { Component } from 'react';

// Group component - represents a single group
class Group extends Component {
	render() {
		return (
			<li className="list-group-item d-flex justify-content-between align-items-center">
				{this.props.group._id}
				<span class="badge badge-primary badge-pill">{this.props.group.count}</span>
			</li>
			);
	}
}

export default Group;