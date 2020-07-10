export function getDepthFirstMaze(grid) {
  const array = [];
  const node = grid[27][9]; // declare node where maze generation starts
  array.push(node);
  let stack = [];
  depthFirstMaze(array, grid, node, stack);
  return array;
}

function depthFirstMaze(array, grid, node, stack) {
  node.isVisited = true; // sets current node as visited

  // if endNode, stop and get a new node from the stack
  if (node === grid[61][25]) {
    if (stack.length == 0) return;
    const newNode = stack.pop();
    depthFirstMaze(array, grid, newNode, stack);
    return;
  }
  // get neighbors of current node
  const neighbors = [];

  if (node.col > 1) neighbors.push(grid[node.col - 2][node.row]);
  if (node.col < grid.length - 2) neighbors.push(grid[node.col + 2][node.row]);
  if (node.row > 1) neighbors.push(grid[node.col][node.row - 2]);
  if (node.row < grid[0].length - 2)
    neighbors.push(grid[node.col][node.row + 2]);

  const unvisitedNeighbors = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  ); // filter out visited neighbors

  // if all neighbors ar visited, the next node is taken from the stack
  if (unvisitedNeighbors == 0) {
    if (stack.length == 0) return;
    const newNode = stack.pop();
    depthFirstMaze(array, grid, newNode, stack);
    return;
  }

  // select a random neighbor
  const randomNumber = Math.floor(Math.random() * unvisitedNeighbors.length);
  const nextNode = unvisitedNeighbors[randomNumber];

  stack = stack.concat(unvisitedNeighbors.splice(randomNumber, 1));

  array.push(
    grid[(node.col + nextNode.col) / 2][(node.row + nextNode.row) / 2]
  );
  array.push(nextNode);

  depthFirstMaze(array, grid, nextNode, stack); // repeat
}

// turns the border nodes into walls
function makeBorder(grid, array) {
  for (let i = 0; i < grid.length; i++) {
    array.push(grid[i][0]);
    array.push(grid[i][grid[0].length - 1]);
  }
  for (let i = 0; i < grid[0].length - 1; i++) {
    array.push(grid[0][i]);
    array.push(grid[grid.length - 1][i]);
  }
}
