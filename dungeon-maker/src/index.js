import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './css/index.css';
import './css/font-awesome.min.css';

ReactDOM.render(
  <MuiThemeProvider>
  	<App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};