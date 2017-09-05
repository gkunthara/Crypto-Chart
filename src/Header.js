import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';


export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPrice: 0
        };
        this.getCurrentPrice = this.getCurrentPrice.bind(this)
    }


    //re-render and update current price
    componentDidMount(){

        this.getCurrentPrice()

    }

    //get current Price of ethereum and update currentPrice's state.
    getCurrentPrice(){
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(response => {

                const price = response.data.USD
                this.setState({
                    currentPrice: price
                })

            })

    }


    render() {

        const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 25px;

    `;
        const headerStyle ={
            marginLeft: 25
        };

        // every 10 seconds, run this.getCurrentPrice (which changes the current state of currentPrice)
        setTimeout(() => this.getCurrentPrice(), 10000)

        return (

            <div>
                <Wrapper>
                    <img src="https://i.imgur.com/qTV7yta.png"/>
                    <h2 style={headerStyle}>Ethereum Price: {this.state.currentPrice} </h2>
                </Wrapper>
            </div>
        )
    }
}