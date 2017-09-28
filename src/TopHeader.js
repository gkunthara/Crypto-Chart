import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import {Link, Route, Redirect} from 'react-router-dom';
import Token from "./Token";
import Home from "./Home";



export class TopHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
        };
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }


    toggleVisibility() {
        this.setState(
            {
                sidebarOpen: !this.state.sidebarOpen
            });
    }


    render(){

        const buttonStyle = {

            border: 'white',
            color: "#2CD696",
            textDecoration: 'none',
            marginLeft: 25,
        };

        const linkItemStyle = {
            fontFamily: 'Roboto',
            fontWeight: '300',
            color: "#09184E",
            fontSize: 18,
            letterSpacing: '3',
            marginLeft: 15,
            marginTop: 25,
            paddingBottom: 15
        }

        const sidebarContent = [
            <Link to={'/home'} onClick={this.toggleVisibility}><h2 style={linkItemStyle}>Home</h2></Link>,
            <Link to={'/ethereum'} onClick={this.toggleVisibility}><h2 style={linkItemStyle}>Ethereum</h2></Link>,
            <Link to={'/bitcoin'} onClick={this.toggleVisibility}><h2 style={linkItemStyle}>Bitcoin</h2></Link>
            ];


        const sidebarStyles = {
            sidebar: {
                backgroundColor: 'white',
                width: '200px',
            },

        };

        const headerStyle = {

            backgroundColor: '#09184E',
        };

        const titleStyle = {
            color: 'white',
            marginLeft: 10,
            marginTop: 7,
            paddingBottom: 5
        };


        return (



            <div>
                <Sidebar sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.toggleVisibility}
                    styles={sidebarStyles}
                >
                    <div className="container-fluid" style={headerStyle}>
                        <div className="row">
                            <button type="button" className="btn btn-outline-primary" style={buttonStyle} onClick={this.toggleVisibility}>=</button>
                            <Link to={'/home'}><h2 style={titleStyle}>Crypto Chart</h2></Link>
                        </div>
                    </div>
                    <Route exact path="/" render={()=> <Redirect to='/home'/>}/>
                    <Route path="/ethereum" render={(props) => (<Token chart="ethereum" {...props}/>)}/>
                    <Route path="/bitcoin"  render={(props) => (<Token chart="bitcoin" {...props}/>)}/>
                    <Route path="/Home" component={Home}/>
                </Sidebar>
            </div>

        )

    }
}