import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/sorting">
        <button>SORTING</button>
      </Link>
      <Link to="/pathfinding">
        <button>PATHFINDING</button>
      </Link>
    </div>
  </Styles>
);
