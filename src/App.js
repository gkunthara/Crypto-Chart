import React, { Component } from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import axios from 'axios';
import {AreaClosed} from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import {Group} from '@vx/group';

//set width, height, and margins
const width = 750;
const height = 400;
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

        //scale x-axis
        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(this.state.dataArr, x)
        });

        //scale y-axis
        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [0, max(this.state.dataArr, y)]
        });

        return (

            <div className="Chart">
                <svg width={width} height={height}>
                    <Group top={margin.top} left={margin.left}>
                        <AreaClosed
                            data={this.state.dataArr}
                            xScale={xScale}
                            yScale={yScale}
                            x={x}
                            y={y}
                            fill={"red"}
                        />
                    </Group>
                </svg>
            </div>
        )
    }
}

export default Chart;
