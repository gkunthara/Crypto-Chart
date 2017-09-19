import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AnimatedNumber from 'react-animated-number';


export class ChartHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPrice:  0,
            percentChange: 0,
            sidebarOpen: false
        };
        this.getCurrentPrice = this.getCurrentPrice.bind(this)
        this.getPercentChange = this.getPercentChange.bind(this)
        this.toggleVisibility = this.toggleVisibility.bind(this)
        this.startDate = this.toUnix()
    }



    //re-render and update current price
    componentDidMount(){

        this.getCurrentPrice();
        this.getPercentChange();

        //every 30 seconds update current price and percent change
        setInterval(() => {

            this.getCurrentPrice();
            this.getPercentChange();


        }, 30000);


    }



    //get current Price of token and update currentPrice's state.
    getCurrentPrice(){

        if(this.props.chartTitle === "ethereum"){
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .then(response => {

                    const price = response.data.USD
                    this.setState({
                        currentPrice: price
                    })

                })

        }
        else if(this.props.chartTitle === "bitcoin"){
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
                .then(response => {

                    const price = response.data.USD
                    this.setState({
                        currentPrice: price
                    })

                })
        }
        else{
            return 0;
        }



    }

    getPercentChange(){

        if(this.props.chartTitle === "ethereum"){
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

        else if(this.props.chartTitle === "bitcoin"){
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start='+this.startDate +'&end=9999999999&period=7200')
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

        else{
            return 0;
        }



    }

    toUnix(){
        let today = new Date()
        let thirty = new Date().setDate(today.getDate()-30)/1000

        return thirty
    }

    toggleVisibility() {
        this.setState(
            {
                sidebarOpen: !this.state.sidebarOpen
            });
    }

    imageToLoad(){

        if(this.props.chartTitle === "ethereum"){

            return "https://i.imgur.com/cIPkPcb.png"
        }
        else if(this.props.chartTitle === "bitcoin"){

            return "https://i.imgur.com/ImOWNFU.png"
        }
    }



    render(){


        const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        //justify-content: center;
        align-items: center;
        //margin-top: 25px;
        margin-left: 80px;

    `;

        const buttonStyle = {
            marginBottom: 10,
            backgroundColor: '#EBF0F1',
            border: 'none',
            width: '17%',
            marginLeft: 25
        };

        const imgStyle = {
            width: '90%',
            height: 'auto'
        };

        const headerStyle ={
            marginRight: 15,
            fontFamily: 'Roboto',
            fontWeight: '300',
            letterSpacing: '3'
        };

        const percentStyle = {
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

                    {/*<h2>{this.props.chartTitle}</h2>*/}

                <button style={buttonStyle}><img style={imgStyle} src={this.imageToLoad()} alt="title"/></button>
                    <h2 style={headerStyle}> &middot; $
                        <AnimatedNumber
                            style={{transition: '0.5s ease-out'}}
                            stepPrecision={0}
                            value={this.state.currentPrice}
                            />
                    </h2>
                    <h2 style={percentStyle}> ({percentOutput}{this.state.percentChange}%) </h2>
                </Wrapper>
            </div>
        )

    }
}