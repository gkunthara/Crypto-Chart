import React, { Component } from 'react';
import {ChartHeader} from './ChartHeader';
import {Chart} from './Chart';
import {Footer} from "./Footer";
import styled from 'styled-components';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';





export class Token extends Component {

    render() {

        const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
    `;



        return(
            <Wrapper>
                <ChartHeader chartTitle = {this.props.chart}/>
                <Chart chartToPlot = {this.props.chart}/>
                <Footer/>
            </Wrapper>
        )
    }
}
