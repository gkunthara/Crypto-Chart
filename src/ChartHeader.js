import React, { Component } from 'react';
import axios from 'axios';
import AnimatedNumber from 'react-animated-number';
import { Col, Row, Button, } from 'antd';
import {Link} from 'react-router-dom';


const ButtonGroup = Button.Group;



export class ChartHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPrice:  0,
            percentChange: 0,
            sidebarOpen: false,
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
        this.timer = setInterval(() => {

            this.getCurrentPrice();
            this.getPercentChange();


        }, 30000);


    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }


    getInterval(){

        if(this.props.interval === "1m"){
            return this.toThirty()
        }
        else if(this.props.interval === "7d"){
            return this.toSeven()
        }
        else if(this.props.interval === "1d"){
            return  this.toOne()
        }
        else{
            return null
        }
    }

    toThirty(){
        let today = new Date()
        let thirty = new Date().setDate(today.getDate()-30)/1000

        return thirty
    }

    toSeven(){
        let today = new Date()
        let seven = new Date().setDate(today.getDate()-7)/1000

        return seven
    }

    toOne(){
        let today = new Date()
        let one = new Date().setDate(today.getDate()-1)/1000

        return one
    }



    //get current Price of token and update currentPrice's state.
    getCurrentPrice(){

        if(this.props.chartTitle === "/ethereum"){
            axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .then(response => {
                    const price = response.data.USD
                    this.setState({
                        currentPrice: price
                    })

                })

        }
        else if(this.props.chartTitle === "/bitcoin"){
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

        const date = this.getInterval();

        if(this.props.chartTitle === "/ethereum"){
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start='+date +'&end=9999999999&period=7200')
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

        else if(this.props.chartTitle === "/bitcoin"){
            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start='+date +'&end=9999999999&period=7200')
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

        if(this.props.chartTitle === "/ethereum"){

            return "https://i.imgur.com/6C4jvHi.png"
        }
        else if(this.props.chartTitle === "/bitcoin"){

            return "https://i.imgur.com/ImOWNFU.png"
        }
    }

    render(){



        // console.log(this.props.location.pathname);

        const imgStyle = {

            width: 150,
            height: 'auto',
            marginLeft: 25,
            marginRight: 10,

        };

        const headerStyle ={
            marginRight: 15,
            fontFamily: 'Roboto',
            fontWeight: '300',
            letterSpacing: '3',
            color: 'white'
        };

        const percentStyle = {
            fontFamily: 'Roboto',
            fontSize: '16',
            fontWeight: '400',
            letterSpacing: '3',
            color: this.state.percentChange > 0 ? '#2CD696' : 'red',
            marginTop: 10
        };

        //if output is greater than 0, add + sign
        const percentOutput = this.state.percentChange >= 0 ? '+' : '';

return (

            <div className="container">
                <Row type="flex" justify="center">
                    <Col>
                        <img style={imgStyle} src={this.imageToLoad()} alt={this.props.chartTitle}/>
                    </Col>
                    <Col>
                        <h2 style={headerStyle}> &middot; $
                            <AnimatedNumber
                                style={{transition: '0.5s ease-out'}}
                                stepPrecision={0}
                                value={this.state.currentPrice}
                                />
                        </h2>
                    </Col>
                    <Col>
                        <h2 style={percentStyle}> ({percentOutput}{this.state.percentChange}%) </h2>
                    </Col>
                    <Col style={{marginLeft: 15, marginTop: 5}}>

                        <ButtonGroup>
                            <Link to={this.props.location}><Button ghost>1m</Button></Link>
                            <Link to={`${this.props.location}/7day`}><Button ghost>7d</Button></Link>
                            <Link to={`${this.props.location}/1day`}><Button ghost>1d</Button></Link>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )

    }
}