import React, { Component } from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import axios from 'axios';
import {AreaClosed} from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max, min } from 'd3-array';
import {Group} from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import styled from 'styled-components';
import {withParentSize} from '@vx/responsive';
import { LinearGradient } from '@vx/gradient';
import { curveMonotoneX } from '@vx/curve';



//convert Unix timestamps
const x = d => new Date(d.date*1000);
//grab only closing values
const y = d => d.close;

//adjust height
const aspectRatio = 0.47;



class Chart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataArr: []
        };

        this.getData = this.getData.bind(this);
        this.getInterval = this.getInterval.bind(this);
    }

    componentDidMount(){

        this.getData();
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

    getPeriod(){
        if(this.props.interval === "1m"){
            return "7200"
        }
        else if(this.props.interval === "7d"){
            return "1800"
        }
        else if(this.props.interval === "1d"){
            return "300"
        }
        else{
            return null
        }
    }


    getData(){

        const date = this.getInterval()
        const period = this.getPeriod()

        if(this.props.chartToPlot === "/ethereum"){

            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start='+date +'&end=9999999999&period='+period)
                .then(response => {

                    const dataArr = response.data
                    this.setState({
                        dataArr: dataArr
                    })

                })

        }

        else if(this.props.chartToPlot === "/bitcoin"){

            axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start='+date +'&end=9999999999&period='+period)
                .then(response => {

                    const dataArr = response.data
                    this.setState({
                        dataArr: dataArr
                    })

                })
        }
        else{
            return null;
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

    render() {
        const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

    `;

        const {
            parentWidth,
        } = this.props;

        //const width = 1200;
        const width = parentWidth;
        const height = parentWidth * aspectRatio;

        const margin = {
            top: 40,
            bottom: 60,
            left: 80,
            right: 80,

        };



        //set xMax and yMax
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;


        //scale x-axis
        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(this.state.dataArr, x)
        });

        //scale y-axis
        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [min(this.state.dataArr, y), max(this.state.dataArr, y)]
        });

        return (

                <Wrapper>
                        <svg width={width} height={height}>
                            <Group top={margin.top} left={margin.left}>

                                <rect
                                    x={0}
                                    y={0}
                                    width={xMax}
                                    height={yMax}
                                    fill="#dfe9f3"
                                    rx={15}
                                />

                                <AxisBottom
                                    data={this.state.dataArr}
                                    scale={xScale}
                                    top={yMax}
                                    x={x}
                                    stroke={'#e3eeff'}
                                    tickTextFill={'#e3eeff'}
                                    numTicks = {3}
                                    tickLength = {12}
                                    hideAxisLine
                                    hideTicks
                                    tickLabelComponent={
                                        <text
                                            fill="#2CD696"
                                            fontSize={12}
                                            textAnchor="middle"
                                            fontFamily="Roboto"
                                        />
                                    }
                                />


                                <GridRows
                                    lineStyle={{ pointerEvents: 'none' }}
                                    scale={yScale}
                                    width={xMax}
                                    strokeDasharray="2,2"
                                    strokeWidth=".2"
                                    stroke="#333"
                                />

                                <GridColumns
                                    lineStyle={{ pointerEvents: 'none' }}
                                    scale={xScale}
                                    height={yMax}
                                    strokeDasharray="2,2"
                                    strokeWidth=".2"
                                    stroke="#333"
                                />

                                <LinearGradient
                                    from='#1e3c72'
                                    to='#2a5298'
                                    id='gradient'
                                />

                                <AreaClosed
                                    data={this.state.dataArr}
                                    xScale={xScale}
                                    yScale={yScale}
                                    x={x}
                                    y={y}
                                    fill={"url(#gradient)"}
                                    stroke={"url(#gradient)"}
                                    curve={curveMonotoneX}

                                />

                                <AxisLeft
                                    scale={yScale}
                                    top={0}
                                    left={-15}
                                    stroke={'#333'}
                                    tickTextFill={'#333'}
                                    numTicks =  {5}
                                    hideAxisLine
                                    hideTicks
                                    tickLabelComponent={
                                        <text
                                            fill="#2CD696"
                                            fontSize={11}
                                            textAnchor="middle"
                                            fontFamily="Roboto"
                                        />
                                    }
                                />
                            </Group>
                        </svg>
                </Wrapper>
        );
    }


}

export default withParentSize(Chart);



