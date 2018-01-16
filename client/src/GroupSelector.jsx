import React, { Component } from 'react';

import Group from './Group.jsx';

// Group Selector component - represents the component that shows a selectable list of live-updating groups
class GroupSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {"selectedGroup": null};
	}

	handleClick(event) {
		let id = event.target.getAttribute("data-id");
		id = id == this.state.selectedGroup ? null : id;
		this.setState({"selectedGroup": id});
		this.props.onGroupChanged(id);
	}

	render() {
		return (
			<ul className="list-group">
			{this.props.groups.map((group) => (<Group key={group._id} group={group} active={group._id === this.state.selectedGroup} onClick={this.handleClick.bind(this)} onDblClick={this.props.onRequestDetails.bind(this)}/>))}
			</ul>
			);
	}
}

export default GroupSelector;