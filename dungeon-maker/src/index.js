import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';


import './css/index.css';
import './css/font-awesome.min.css';

ReactDOM.render((
  <Router >
    <MuiThemeProvider>
      <App/> 
    </MuiThemeProvider>
  </Router>
), document.getElementById('root'));

