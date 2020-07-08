import React from "react";
import Styled from "styled-components";

const Styles = Styled.div`
    .node {
        height: 30px;
        width: 30px;
        border: 1px solid black;
        border-bottom: none;
        border-right: none;
    }

    .node-start {
        background-color: green;
    }

    .node-end {
        background-color: red;
    }

    .node-visited {
        animation: visited-animation 2s forwards;
    }

    /* blue-brown-yelllow */
    @keyframes visited-animation {
        0% {transform: scale(0.3); background-color: rgb(60, 51, 81) ;}
        25% {background-color: rgb(106, 80, 109);}
        50% {background-color: rgb(174, 107, 107);}
        75% {transform: scale(1.2); background-color: rgb(219, 159, 109);}
        100% {transform: scale(1); background-color: rgb(255, 223, 122);}
    }

    .path {
        animation: path-animation 2s forwards;
    }

    /* red-pink-purple */
    @keyframes path-animation {
        0% {transform: scale(0.3); background-color: rgb(255, 76, 76) ;}
        25% {background-color: rgb(255, 76, 193);}
        50% {background-color: rgb(235, 76, 255);}
        75% {transform: scale(1.2); background-color: rgb(172, 76, 255);}
        100% {transform: scale(1); background-color: rgb(127, 76, 255);}
    }

    .material-icons {
    }
`;

class Node extends React.Component {
  render() {
    const { col, row, isStart, isEnd } = this.props;
    const name = isStart ? "node-start" : isEnd ? "node-end" : "";
    let icon;
    if (isStart) {
      icon = <i className="material-icons">stop_circle</i>;
    } else if (isEnd) {
      icon = <i className="material-icons">star</i>;
    }

    return (
      <Styles>
        <div id={`node-${col}-${row}`} className={`node ${name}`}>
          {icon}
        </div>
      </Styles>
    );
  }
}

export default Node;
