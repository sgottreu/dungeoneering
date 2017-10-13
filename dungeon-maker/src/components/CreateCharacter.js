import React, { Component } from 'react';
import EntityForm from './EntityForm';

class CreateCharacter extends Component {

	render() {
		return (
			<div className="CreateCharacter">
				<EntityForm type="character"  {...this.props} />
			</div>
		);

	}

}

export default CreateCharacter;