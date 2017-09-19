import React, { Component } from 'react';
import {Header} from './ChartHeader';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TopHeader} from "./TopHeader";





class App extends Component {

    render() {


        return(

            <Router>
                <div>
                    <TopHeader/>
                </div>
            </Router>

        )
    }
}

export default App;
