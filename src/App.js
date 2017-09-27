import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
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
