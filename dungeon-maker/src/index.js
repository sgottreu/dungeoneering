import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './css/index.css';

ReactDOM.render(
  <MuiThemeProvider>
  	<App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
