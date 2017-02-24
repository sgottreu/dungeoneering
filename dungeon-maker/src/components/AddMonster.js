import React, { Component } from 'react';
import EntityForm from './EntityForm';

class AddMonster extends Component {

	render() {
		return (
			<div className="AddMonster">
				<EntityForm type="monster" />
			</div>
		);

	}

}

export default AddMonster;