import React, { Component } from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import axios from 'axios';
import {AreaClosed} from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import {Group} from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import styled from 'styled-components';
import {withParentSize} from '@vx/responsive';
import {Header} from './Header';
import { LinearGradient } from '@vx/gradient';
import {Footer} from "./Footer";

//set parentWidth, parentHeight, and margins
// const parentWidth = 1000; //1250
// const parentHeight = 600; //650




//convert Unix timestamps
const x = d => new Date(d.date*1000);
//grab only closing values
const y = d => d.close;

//adjust height
const aspectRatio = 0.45


class Chart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataArr: []
        };
        this.startDate = this.toUnix()
        this.getData = this.getData.bind(this)
    }

    componentDidMount(){

        this.getData()

    }
    
    getData(){
        axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start='+this.startDate +'&end=9999999999&period=7200')
            .then(response => {

                const dataArr = response.data
                this.setState({
                    dataArr: dataArr
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
        justify-content: center;
        align-items: center;

    `;

        const {parentHeight, parentWidth} = this.props;

        const width = parentWidth;
        //const height = parentWidth * aspectRatio ;
        const height = parentHeight;

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
            domain: [250, max(this.state.dataArr, y)]
        });

        return (
            <div>
            <Header/>
            <Wrapper>
            <div className="Chart">

                <svg width={width} height={height}>

                   <Group top={margin.top} left={margin.left}>

                        <rect
                            x={0}
                            y={0}
                            width={xMax}
                            height={yMax}
                            fill="#e3eeff"
                            rx={12}
                        />


                        <GridRows
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={yScale}
                            width={xMax}
                            strokeDasharray="2,2"
                            strokeWidth=".2"
                            stroke="#57618F"
                        />

                        <GridColumns
                            lineStyle={{ pointerEvents: 'none' }}
                            scale={xScale}
                            height={yMax}
                            strokeDasharray="2,2"
                            strokeWidth=".2"
                            stroke="#57618F"
                        />

                       <LinearGradient
                           from='#a3bded'
                           to='#6991c7'
                           id='gradient'
                       />

                        <AreaClosed
                            data={this.state.dataArr}
                            xScale={xScale}
                            yScale={yScale}
                            x={x}
                            y={y}
                            fill={"url(#gradient)"}
                            stroke={""}

                        />
                        {/*<AxisBottom*/}
                            {/*scale={xScale}*/}
                            {/*top={yMax}*/}
                            {/*label={''}*/}
                            {/*stroke={'#e3eeff'}*/}
                            {/*tickTextFill={'#e3eeff'}*/}
                            {/*numTicks = {7}*/}
                        {/*/>*/}
                        <AxisLeft
                            scale={yScale}
                            top={0}
                            left={0}
                            label={'Price ($)'}
                            stroke={'#e3eeff'}
                            tickTextFill={'#e3eeff'}
                            numTicks =  {7}
                        />


                    </Group>
                </svg>
            </div>
            </Wrapper>
                <Footer/>
            </div>
        )
    }
}

export default withParentSize(Chart);
