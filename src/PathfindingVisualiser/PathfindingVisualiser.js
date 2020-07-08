import React from "react";
import Styled from "styled-components";
import Node from "./Node";
import * as algorithms from "../Algorithms.js";

const Styles = Styled.div`
    .toolbar {
        background-color: lightcoral;
        text-align: center;
    }
    
    .grid {
        text-align: center;
    }

    .col {
        display: inline-block;
        vertical-align: top;

        > div:last-child {
            border-bottom: 1px solid black;
        }

        &:last-of-type {
            border-right: 1px solid black;
        }
    }
`;

// [col ,row]
const BOARD = [40, 20];
const START_NODE = [0, 0];
const END_NODE = [35, 15];

class PathfindingVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }

  componentDidMount() {
    this.resetGrid();
  }

  resetGrid() {
    const grid = createGrid();
    this.setState({ grid });
  }

  djikstra() {
    const { grid } = this.state;
    const result = algorithms.djikstra(
      grid,
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        const node = result[i];
        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node node-visited";
      }, i * 15);
    }

    const shortestPath = algorithms.getShortestPath(
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    setTimeout(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-visited path";
        }, i * 30);
      }
    }, result.length * 15 + 2000);
  }

  kruskal() {}

  prim() {}

  handleMouseDown() {
    this.setState({ isMousePressed: true });
  }

  handleMouseEnter(col, row) {
    const { grid, isMousePressed } = this.state;
    if (!isMousePressed) return;
    grid[col][row].isWall = !grid[col][row].isWall;
    this.setState({ grid });
  }

  handleMouseUp() {
    this.setState({ isMousePressed: false });
  }

  render() {
    const { grid } = this.state;
    return (
      <Styles>
        <div className="toolbar">
          <div className="button-container">
            {/*<button id="reset-button" onClick={() => this.resetGrid()}>
              Reset
    </button>*/}
            <button id="djikstra-button" onClick={() => this.djikstra()}>
              Dijkstra's
            </button>
            {/*
            <button id="kruskal-button" onClick={() => this.kruskal()}>
              Kruskal's
            </button>
            <button id="prim-button" onClick={() => this.prim()}>
              Prim's
            </button>
            */}
          </div>
        </div>
        <div className="grid">
          {grid.map((col, colIdx) => {
            return (
              <div className="col" key={colIdx}>
                {col.map((node, nodeIdx) => {
                  const { isStart, isEnd, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={colIdx}
                      row={nodeIdx}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      previousNode={null}
                      onMouseDown={() => this.handleMouseDown()}
                      onMouseEnter={(col, nodeIdx) =>
                        this.handleMouseEnter(col, nodeIdx)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </Styles>
    );
  }
}

const createGrid = () => {
  let grid = [];
  for (let i = 0; i < BOARD[0]; i++) {
    let cols = [];
    for (let j = 0; j < BOARD[1]; j++) {
      cols.push(createNode(i, j));
    }
    grid.push(cols);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: col === START_NODE[0] && row === START_NODE[1],
    isEnd: col === END_NODE[0] && row === END_NODE[1],
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
  };
};

export default PathfindingVisualiser;
