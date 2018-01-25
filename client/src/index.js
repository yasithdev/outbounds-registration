import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DataViewer from './DataViewer';
import registerServiceWorker from './registerServiceWorker';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';


ReactDOM.render((
	<Router>
	<div>
		<Route exact path="/" component={App}/>
		<Route exact path="/view" component={DataViewer}/>
	</div>
	</Router>
	), document.getElementById('root'));
registerServiceWorker();
