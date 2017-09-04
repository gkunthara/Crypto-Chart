import React, { Component } from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import axios from 'axios';
import {AreaClosed} from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import {Group} from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import styled from 'styled-components';

//set width, height, and margins
const width = 1250; //1250
const height = 650; //650
const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
};

//set xMax and yMax
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;


//convert Unix timestamps
const x = d => new Date(d.date*1000);
//grab only closing values
const y = d => d.close;


class Chart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataArr: []
        };
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){

        this.getData()

    }

    getData(){

        axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=1501632000&end=9999999999&period=14400')
            .then(response => {
                const dataArr = response.data
                this.setState({
                    dataArr: dataArr
                })

            })

    }



    render() {

        const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
    `;


        //scale x-axis
        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(this.state.dataArr, x)
        });

        //scale y-axis
        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [200, max(this.state.dataArr, y)]
        });

        return (


            <Wrapper>
            <div className="Chart">
                <svg width={width} height={height}>

                    <Group top={margin.top} left={margin.left}>

                        <rect
                            x={0}
                            y={0}
                            width={xMax}
                            height={yMax}
                            fill="#32deaa"
                            rx={10}
                        />


                        <GridRows
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={yScale}
                            width={xMax}
                            strokeDasharray="2,2"
                            stroke="rgba(255,255,255,0.3)"
                        />

                        <GridColumns
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={xScale}
                            height={yMax}
                            strokeDasharray="2,2"
                            stroke="rgba(255,255,255,0.3)"
                        />
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
                            <stop
                                offset="100%"
                                stopColor="#FFFFFF"
                                stopOpacity={0.2}
                            />
                        </linearGradient>

                        <AreaClosed
                            data={this.state.dataArr}
                            xScale={xScale}
                            yScale={yScale}
                            x={x}
                            y={y}
                            fill={"url(#gradient)"}
                            stroke={""}

                        />
                        <AxisBottom
                            scale={xScale}
                            top={yMax}
                            label={''}
                            stroke={'#1b1a1e'}
                            tickTextFill={'#1b1a1e'}
                            numTicks = {7}
                        />
                        <AxisLeft
                            scale={yScale}
                            top={0}
                            left={0}
                            label={'Price ($)'}
                            stroke={'#1b1a1e'}
                            tickTextFill={'#1b1a1e'}
                            numTicks =  {5}
                        />


                    </Group>
                </svg>
            </div>
            </Wrapper>
        )
    }
}

export default Chart;
