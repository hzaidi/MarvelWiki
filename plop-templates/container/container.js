import React, { Component } from 'react';
import './{{ dashCase name }}.css';
import { connect } from 'react-redux';

class {{ properCase name }} extends Component {
	constructor(props) {
    	super(props);
  	}

  	render() {
		return (
			<div className="{{ dashCase name }}">
					This is a test Container Component
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	return {

	}
}
const mapActionsToProp = {

}


export default connect(mapStateToProps, mapActionsToProp)({{ properCase name }})
