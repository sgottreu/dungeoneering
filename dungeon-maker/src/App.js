import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TabbedApp from './components/TabbedApp';
import './css/App.css';

injectTapEventPlugin();

class App extends Component {
  // constructor(props){
  //   super(props);
  // }



  render() {
    return (    	
	      <div className="App">
          <TabbedApp />     	
	      </div>
    );
  }
}

export default App;

