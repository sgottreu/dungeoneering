import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';


import './css/index.css';
import './css/font-awesome.min.css';

ReactDOM.render((
  <Provider store={store}>
    <Router >
      <MuiThemeProvider>
        <App/> 
      </MuiThemeProvider>
    </Router>
  </Provider>
), document.getElementById('root'));

