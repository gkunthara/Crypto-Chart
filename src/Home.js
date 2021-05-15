import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import "./antd/dist/antd.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const cardStyle = {
      width: 175,
      height: 150,
      borderColor: "black",
      borderWidth: 2,
    };

    const h1Style = {
      color: "white",
      marginTop: 50,
      marginBottom: 50,
      letterSpacing: "2",
    };

    return (
      <div>
        <div
          style={{ background: "transparent" }}
          className="jumbotron text-center"
        >
          <div className="container">
            <h1 style={h1Style} className="display-4">
              Check out the latest prices of Ethereum & Bitcoin
            </h1>
            <Row type="flex" justify="center">
              <Col>
                <Link to={"/ethereum"}>
                  <Card style={cardStyle}>
                    <div className="custom-image">
                      <img
                        alt="example"
                        width="50%"
                        src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png"
                      />
                      <h4 style={{ marginTop: 10, fontFamily: "Roboto" }}>
                        Ethereum
                      </h4>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col offset={1}>
                <Link to={"/bitcoin"}>
                  <Card style={cardStyle}>
                    <div className="custom-image">
                      <img
                        alt="example"
                        width="50%"
                        src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"
                      />
                      <h4 style={{ marginTop: 10, fontFamily: "Roboto" }}>
                        Bitcoin
                      </h4>
                    </div>
                  </Card>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
