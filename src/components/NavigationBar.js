import React from "react";
import Styled from "styled-components";

const Styles = Styled.div`
    .navbar {
        background-color: lightcoral;
        justify-content: center;
        display: flex;
    }

    button {
        background: none;
        border: none;
        padding: 0 5px;
        text-align: center;
    }
`;

export const NavigationBar = () => (
  <Styles>
    <div className="navbar">
      <a href="/algo-visualiser/sorting">
        <button>SORTING</button>
      </a>
      <a href="/algo-visualiser/pathfinding">
        <button>PATHFINDING</button>
      </a>
    </div>
  </Styles>
);
