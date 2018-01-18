import React, { Component } from 'react';

import Group from './Group.jsx';

// Group Selector component - represents the component that shows a selectable list of live-updating groups
class GroupSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {"selectedGroup": null, "lockedGroups": []};
	}

	lockGroup(id) {
		let lockedGroups = this.state.lockedGroups;
		if (lockedGroups.indexOf(id) === -1) {
			lockedGroups.push(id);
			this.setState({"lockedGroups": lockedGroups});
		}
	}

	lockGroups(array) {
		this.setState({"lockedGroups": array});
	}

	unlockGroup(id){
		let lockedGroups = this.state.lockedGroups;
		let idx = lockedGroups.indexOf(id);
		if (idx !== -1) {
			lockedGroups.splice(idx,1);
			this.setState({"lockedGroups": lockedGroups});
		}
	}

	handleClick(event) {
		let id = event.target.getAttribute("data-id");
		id = (id === this.state.selectedGroup ? null : id);
		this.setState({"selectedGroup": id});
		this.props.onGroupChanged(id);
	}

	render() {
		return (
			<ul className="list-group">
			{this.props.groups.map((group) => (<Group key={group._id} group={group} active={group._id === this.state.selectedGroup} locked={this.state.lockedGroups.indexOf(group._id) !== -1} onClick={this.handleClick.bind(this)} onDoubleClick={this.props.onRequestDetails.bind(this)}/>))}
			</ul>
			);
	}
}

export default GroupSelector;