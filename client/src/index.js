import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithRoutes from './AppWithRoutes';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<AppWithRoutes/>, document.getElementById('root'));
registerServiceWorker();
