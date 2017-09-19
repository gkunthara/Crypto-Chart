import React, { Component } from 'react';
import {Header} from './ChartHeader';
import styled from 'styled-components';





export class Home extends Component {

    render() {

        const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        //margin-left: 80px;

    `;

        return(
            <div>
                <Wrapper>
                    Welcome to Token Chart Where you can view all your favorite tokens!
                </Wrapper>
            </div>
        )
    }
}
