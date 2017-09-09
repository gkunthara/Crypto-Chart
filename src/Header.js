import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AnimatedNumber from 'react-animated-number';


export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPrice:  0,
            percentChange: 0
        };
        this.getCurrentPrice = this.getCurrentPrice.bind(this)
        this.getPercentChange = this.getPercentChange.bind(this)
        this.startDate = this.toUnix()
    }


    componentWillMount(){

        this.getCurrentPrice();
        this.getPercentChange();

    }


    //re-render and update current price
    componentDidMount(){

        //every 30 seconds update current price and percent change
        setInterval(() => {

            this.getCurrentPrice();
            this.getPercentChange();


        }, 30000);


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

    getPercentChange(){
        axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start='+this.startDate +'&end=9999999999&period=7200')
            .then(response => {

                const first = response.data[0].close;
                const current = response.data[(response.data.length)-1].close;
                const change = (current - first) / first * 100; //percent change formula
                const output = Math.round(change * 100) / 100; //round to two decimal places
                this.setState({
                    percentChange:  output
                })

            })

    }

    toUnix(){
        let today = new Date()
        let thirty = new Date().setDate(today.getDate()-30)/1000

        return thirty
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

        const percentStyle = {
            marginLeft: 15,
            fontFamily: 'Roboto',
            fontSize: '16',
            fontWeight: '400',
            letterSpacing: '3',
            color: this.state.percentChange > 0 ? '#0ba360' : 'red'
        };

        //if output is greater than 0, add + sign
        const percentOutput = this.state.percentChange >= 0 ? '+' : '';


        return (


            <div>
                <Wrapper>
                <img src="https://i.imgur.com/i14bZwH.png" alt="Ethereum logo"/>
                <h2 style={headerStyle}>ethereum </h2>
                <h2 style={headerStyle}> &middot; $


                    <AnimatedNumber
                        style={{transition: '0.5s ease-out'}}
                        stepPrecision={0}
                        value={this.state.currentPrice}
                        />
                </h2>
                <h2  style={percentStyle}> ({percentOutput}{this.state.percentChange}%) </h2>
                </Wrapper>
            </div>

        )
    }
}