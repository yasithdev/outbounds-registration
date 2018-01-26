import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataViewer from './DataViewer';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';



class AppWithRoutes extends Component{
    render(){
        return(<Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/view.html   " component={DataViewer}/>
            </div>
        </Router>);
    }
}


export default AppWithRoutes;