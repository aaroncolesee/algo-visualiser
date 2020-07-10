import React from "react";
import Styled from "styled-components";
import Node from "./Node";
import * as pathfindingAlgorithms from "../PathfindingAlgorithms.js";
import * as mazeAlgorithms from "../MazeGenerationAlgorithms.js";

const ANIMATION_SPEED_MS = 10;
const SP_ANIMATION_SPEED_MS = 30;

// [col ,row]
const BOARD = [71, 31];
const START_NODE = [27, 9];
const END_NODE = [61, 25];

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

    .legend-container {
        padding: 5px 0 5px 0;
        display: flex;
        justify-content: center;
    }

    .legend {
        margin: 0 5px 0 5px;
        veritcal-align: middle;
    }

    .box {        
        margin: 0 5px 0 5px;
        height: 25px;
        width: 25px;
        float: left;
    }

    .material-icons {
        vertical-align: middle;
        font-size: 25px;
    }

    .legend > .material-icons {
        margin: 0 5px 0 5px;
    }

    .start-icon {
      color: mediumseagreen;
    }

    .end-icon {
      color: tomato;
    }
`;

class PathfindingVisualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }

  componentDidMount() {
    const grid = createGrid();

    this.setState({ grid });
  }

  // resets the grid to a clean slate
  resetGrid() {
    const grid = createGrid();

    for (let i = 0; i < BOARD[0]; i++) {
      for (let j = 0; j < BOARD[1]; j++) {
        document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }

    this.resetParams();

    this.setState({ grid });
  }

  // clears the visited nodes
  clearPath() {
    const { grid } = this.state;

    for (let i = 0; i < BOARD[0]; i++) {
      for (let j = 0; j < BOARD[1]; j++) {
        if (
          document.getElementById(`node-${i}-${j}`).className ==
            "node node-visited" ||
          document.getElementById(`node-${i}-${j}`).className ==
            "node node-visited path"
        ) {
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
      this.resetParams();
      this.setState({ grid });
    }
  }

  // resets parameters of nodes - to be called after each algorithm
  resetParams() {
    const { grid } = this.state;
    for (const col of grid) {
      for (const node of col) {
        node.isVisited = false;
        node.distance = Infinity;
      }
    }
  }

  // dijkstra's algorithm
  djikstra() {
    this.disableButtons();

    const { grid } = this.state;

    const result = pathfindingAlgorithms.djikstra(
      grid,
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    // animates visited nodes
    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        const node = result[i];
        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node node-visited";
      }, i * ANIMATION_SPEED_MS);
    }

    const shortestPath = pathfindingAlgorithms.getShortestPath(
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    // animates the shortest path
    setTimeout(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-visited path";
        }, i * SP_ANIMATION_SPEED_MS);
      }
    }, result.length * ANIMATION_SPEED_MS);

    setTimeout(() => {
      this.enableButtons();
    }, result.length * ANIMATION_SPEED_MS + shortestPath.length * SP_ANIMATION_SPEED_MS);
  }

  // A* algorithm
  astar() {
    this.disableButtons();

    const { grid } = this.state;

    const result = pathfindingAlgorithms.astar(
      grid,
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    // animates the visited nodes
    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        const node = result[i];
        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node node-visited";
      }, i * ANIMATION_SPEED_MS);
    }

    const shortestPath = pathfindingAlgorithms.getShortestPath(
      grid[START_NODE[0]][START_NODE[1]],
      grid[END_NODE[0]][END_NODE[1]]
    );

    // animates the shortest path
    setTimeout(() => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          document.getElementById(`node-${node.col}-${node.row}`).className =
            "node node-visited path";
        }, i * SP_ANIMATION_SPEED_MS);
      }
    }, result.length * ANIMATION_SPEED_MS);

    setTimeout(() => {
      this.enableButtons();
    }, result.length * ANIMATION_SPEED_MS + shortestPath.length * SP_ANIMATION_SPEED_MS);
  }

  // generates a maze using depth first search
  depthFirstMaze() {
    this.disableButtons();

    const { grid } = this.state;

    this.resetGrid();

    this.setState({ grid });

    const result = mazeAlgorithms.getDepthFirstMaze(grid);

    // set all nodes to walls
    for (let i = 0; i < BOARD[0]; i++) {
      for (let j = 0; j < BOARD[1]; j++) {
        document.getElementById(`node-${i}-${j}`).className = "node wall";
        grid[i][j].isWall = true;
      }
    }

    // generate the paths
    for (let i = 0; i < result.length; i++) {
      setTimeout(() => {
        const node = result[i];
        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node";
        grid[node.col][node.row].isWall = false;
      }, i * ANIMATION_SPEED_MS);
    }

    setTimeout(() => {
      this.resetParams();
      this.setState({ grid });
      this.enableButtons();
    }, result.length * ANIMATION_SPEED_MS);
  }

  disableButtons() {
    document.getElementById("reset-button").disabled = true;
    document.getElementById("clear-path-button").disabled = true;
    document.getElementById("dijkstra-button").disabled = true;
    document.getElementById("astar-button").disabled = true;
    document.getElementById("depth-first-maze-button").disabled = true;
  }

  enableButtons() {
    document.getElementById("reset-button").disabled = false;
    document.getElementById("clear-path-button").disabled = false;
    document.getElementById("dijkstra-button").disabled = false;
    document.getElementById("astar-button").disabled = false;
    document.getElementById("depth-first-maze-button").disabled = false;
  }

  handleMouseDown(col, row) {
    const { grid } = this.state;

    grid[col][row].isWall = !grid[col][row].isWall;

    this.setState({ grid, isMousePressed: true });
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
            <button id="reset-button" onClick={() => this.resetGrid()}>
              Reset
            </button>
            <button id="clear-path-button" onClick={() => this.clearPath()}>
              Clear Path
            </button>
            <button id="dijkstra-button" onClick={() => this.djikstra()}>
              Dijkstra's
            </button>
            <button id="astar-button" onClick={() => this.astar()}>
              A*
            </button>
            <button
              id="depth-first-maze-button"
              onClick={() => this.depthFirstMaze()}
            >
              Depth First Maze
            </button>
          </div>
          <div className="legend-container">
            <div className="legend">
              <i className="material-icons start-icon">stop_circle</i>
              Start Node
            </div>
            <div className="legend">
              <i className="material-icons end-icon">star</i>
              End Node
            </div>
            <div className="legend">
              <div
                className="box"
                style={{
                  backgroundColor: "white",
                }}
              />
              Unvisited Nodes
            </div>
            <div className="legend">
              <div
                className="box"
                style={{
                  backgroundColor: "rgb(255, 223, 122)",
                }}
              />
              Visited Nodes
            </div>
            <div className="legend">
              <div
                className="box"
                style={{
                  backgroundColor: "#364958",
                }}
              />
              Wall Nodes
            </div>
            <div className="legend">
              <div
                className="box"
                style={{
                  backgroundColor: "rgb(127, 76, 255)",
                }}
              />
              Shortest Path
            </div>
          </div>
        </div>
        <div className="grid">
          {grid.map((col, colIdx) => {
            return (
              <div className="col" key={colIdx}>
                {col.map((node, nodeIdx) => {
                  const { className, isStart, isEnd, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      className={className}
                      col={colIdx}
                      row={nodeIdx}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      previousNode={null}
                      onMouseDown={(col, nodeIdx) =>
                        this.handleMouseDown(col, nodeIdx)
                      }
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
