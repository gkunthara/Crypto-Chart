import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Token from './Token';



export class Currency extends Component {




    render() {

        const currentLocation = this.props.match.path === "/ethereum" ? '/ethereum' : '/bitcoin';

        return(
            <Switch>
                <Route exact path={this.props.match.path} render={(props) => (<Token chart= {this.props.match.path}
                                                                                     location={currentLocation} interval="1m"/>)}/>
                <Route path={`${this.props.match.path}/7day`} render={(props) => (<Token chart = {this.props.match.path}
                                                                                         location={currentLocation}
                                                                                         interval="7d"/>)}/>
                <Route path={`${this.props.match.path}/1day`} render={(props) => (<Token chart = {this.props.match.path}
                                                                                         location={currentLocation}
                                                                                         interval="1d"/>)}/>
            </Switch>

        )

    }

}


export default Currency
