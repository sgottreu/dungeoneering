import React, { Component } from 'react';
import EntityForm from './EntityForm';

class AddMonster extends Component {

	render() {
		return (
			<div className="AddMonster">
				<EntityForm type="monster"  {...this.props} />
			</div>
		);

	}

}

export default AddMonster;