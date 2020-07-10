// dijkstra
export function djikstra(grid, startNode, endNode) {
  startNode.distance = 0; // all nodes have distance infinity, set startNode distance to 0
  const visitedNodes = [];
  const unvisitedNodes = [];
  for (const col of grid) {
    for (const node of col) {
      unvisitedNodes.push(node); // get all unvisited nodes
    }
  }

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance); // sort unvisited nodes by distance
    const closestNode = unvisitedNodes.shift(); // get the closest node and remove from stack
    if (closestNode.isWall) continue; // ignore if wall
    if (closestNode.distance === Infinity) return visitedNodes; // stop condition; remaining nodes aren't reachable since the closest node has distance Infinity
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes; // stop condition;endNode reached
    updateDistances(grid, closestNode); // update distance of neighbors
  }
}

function updateDistances(grid, node) {
  const neighbors = [];

  // get neighbor nodes
  if (node.col > 0) neighbors.push(grid[node.col - 1][node.row]);
  if (node.col < grid.length - 1) neighbors.push(grid[node.col + 1][node.row]);
  if (node.row > 0) neighbors.push(grid[node.col][node.row - 1]);
  if (node.row < grid[0].length - 1)
    neighbors.push(grid[node.col][node.row + 1]);

  const unvisitedNeighbors = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  ); // filter out visited neighbors

  // update distance of neighbors
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function astar(grid, startNode, endNode) {
  startNode.distance = 0;
  const visitedNodes = [];
  const unvisitedNodes = [];
  for (const col of grid) {
    for (const node of col) {
      unvisitedNodes.push(node);
    }
  }
  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    updateDistancesAstar(grid, closestNode, endNode);
  }
}

function updateDistancesAstar(grid, node, endNode) {
  const neighbors = [];

  if (node.col > 0) neighbors.push(grid[node.col - 1][node.row]);
  if (node.col < grid.length - 1) neighbors.push(grid[node.col + 1][node.row]);
  if (node.row > 0) neighbors.push(grid[node.col][node.row - 1]);
  if (node.row < grid[0].length - 1)
    neighbors.push(grid[node.col][node.row + 1]);

  const unvisitedNeighbors = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  );

  for (const neighbor of unvisitedNeighbors) {
    const heuristic =
      Math.abs(endNode.col - neighbor.col) +
      Math.abs(endNode.row - neighbor.row);

    neighbor.distance = node.distance + 1 + Math.pow(heuristic, 2); // A* is similar to Dijkstra's but adds an additional heuristic to the cost;
    neighbor.previousNode = node;
  }
}

export function getShortestPath(startNode, endNode) {
  const shortestPath = [];

  let node = endNode;

  // gets the shortest path by backtracking from the endNode to the startNode
  while (node !== null) {
    shortestPath.unshift(node);
    node = node.previousNode;
  }

  return shortestPath;
}
