import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Col, Row  } from 'antd';
import './antd/dist/antd.css';
import {Link} from 'react-router-dom';




export class Home extends Component {

    render() {

        const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;

    `;

        const pStyle ={
            marginTop: 25,
            marginBottom: 25
        };

        const cardStyle = {
            width: 175,
            height: 150
        }


        return(
            <div>
                <Wrapper>
                    <div className="jumbotron text-center">
                        <div className="container">
                            <h1 className="display-3">Crypto Chart</h1>
                            <p style={pStyle} className="lead">Check out prices of Ethereum & Bitcoin.</p>
                                <Row type="flex" justify="center">
                                    <Col span={4}>
                                        <Link to={'/ethereum'}>
                                            <Card style={cardStyle}>
                                                <div className="custom-image">
                                                    <img alt="example" width="50%" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png"/>
                                                    <h4 style={{marginTop: 10, fontFamily: 'Roboto'}}>Ethereum</h4>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col span={4}>
                                        <Link to={'/bitcoin'}>
                                            <Card style={cardStyle}>
                                                <div className="custom-image">
                                                    <img alt="example" width="50%" src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"/>
                                                    <h4 style={{marginTop: 10, fontFamily: 'Roboto'}}>Bitcoin</h4>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                </Row>
                        </div>
                    </div>
                </Wrapper>
            </div>
        )
    }
}
