import React, { PureComponent } from "react";
import { ChartHeader } from "./ChartHeader";
import Chart from "./Chart";
import { Footer } from "./Footer";
import styled from "styled-components";

class Token extends PureComponent {
  render() {
    const Wrapper = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 25px;
    `;

    return (
      <Wrapper>
        <ChartHeader
          location={this.props.location}
          chartTitle={this.props.chart}
          interval={this.props.interval}
        />
        <Chart chartToPlot={this.props.chart} interval={this.props.interval} />
        <Footer />
      </Wrapper>
    );
  }
}

export default Token;
