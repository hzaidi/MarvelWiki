import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllCharacters } from './actions/charactersActions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchAllCharacters();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">

      </div>
    );
  }
}

// first Parameter is the state
//second parameter is the props that is passsed from parent component
const mapStateToProps = (state, props) => {
  const { characters } = state;
  return {
    characters
  }
}
const mapActionsToProp = {
    onFetchAllCharacters: fetchAllCharacters
}


export default connect(mapStateToProps, mapActionsToProp)(App)
