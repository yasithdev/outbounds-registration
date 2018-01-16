import React, { Component } from 'react';

import Group from './Group.jsx';

// Group Selector component - represents the component that shows a selectable list of live-updating groups
class GroupSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {"groups": [], "selectedGroup": null};
	}

	render() {
		return (
			<ul className="list-group">
				{this.state.groups.map((group) => (<Group group={group}/>))}
			</ul>
			);
	}
}

export default GroupSelector;