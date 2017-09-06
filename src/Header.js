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
        //justify-content: center;
        align-items: center;
        margin-top: 25px;
        margin-left: 80px;

    `;
        const headerStyle ={
            marginLeft: 15,
            fontFamily: 'Roboto',
            fontWeight: '300',
            letterSpacing: '3'
        };

        // every 30 seconds, run this.getCurrentPrice (which changes the current state of currentPrice)
        setTimeout(() => this.getCurrentPrice(), 30000)

        return (

            <div>
                <Wrapper>
                    <img src="https://i.imgur.com/i14bZwH.png" alt="Ethereum logo"/>
                    <h2 style={headerStyle}>ethereum </h2>
                    <h2 style={headerStyle}> &middot; ${this.state.currentPrice} </h2>
                </Wrapper>
            </div>
        )
    }
}