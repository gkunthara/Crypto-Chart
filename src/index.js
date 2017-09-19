import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './ChartHeader';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';


ReactDOM.render((  <App/>), document.getElementById('root'));
registerServiceWorker();
