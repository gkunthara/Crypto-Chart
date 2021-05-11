import React, { Component } from "react";
import styled from "styled-components";

export class Footer extends Component {
  render() {
    const Wrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
    const footerStyle = {
      fontFamily: "Roboto",
      fontWeight: "400",
      letterSpacing: "3",
      color: "#2CD696",
    };

    const linkStyle = {
      fontFamily: "Roboto",
      fontWeight: "400",
      color: "#2CD696",
    };

    return (
      <div>
        <Wrapper>
          <small style={footerStyle}>
            made with{" "}
            <a style={linkStyle} href="https://vx-demo.now.sh/">
              vx{" "}
            </a>
          </small>
        </Wrapper>
      </div>
    );
  }
}
