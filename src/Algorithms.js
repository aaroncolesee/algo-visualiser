//Mergesort
export function getMergesortAnimations(array) {
  if (array.length <= 1) return array;

  const animations = [];
  const auxiliaryArray = array.slice();
  mergesort(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergesort(array, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;

  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergesort(auxiliaryArray, startIdx, middleIdx, array, animations);
  mergesort(auxiliaryArray, middleIdx + 1, endIdx, array, animations);

  merge(array, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(array, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let counter = startIdx;
  let lcounter = startIdx;
  let rcounter = middleIdx + 1;

  while (lcounter <= middleIdx && rcounter <= endIdx) {
    animations.push([lcounter, rcounter]);
    animations.push([lcounter, rcounter]);
    if (auxiliaryArray[lcounter] <= auxiliaryArray[rcounter]) {
      animations.push([counter, auxiliaryArray[lcounter]]);
      array[counter] = auxiliaryArray[lcounter];
      counter++;
      lcounter++;
    } else {
      animations.push([counter, auxiliaryArray[rcounter]]);
      array[counter] = auxiliaryArray[rcounter];
      counter++;
      rcounter++;
    }
  }

  while (lcounter <= middleIdx) {
    animations.push([lcounter, lcounter]);
    animations.push([lcounter, lcounter]);
    animations.push([counter, auxiliaryArray[lcounter]]);
    array[counter] = auxiliaryArray[lcounter];
    counter++;
    lcounter++;
  }

  while (rcounter <= endIdx) {
    animations.push([rcounter, rcounter]);
    animations.push([rcounter, rcounter]);
    animations.push([counter, auxiliaryArray[rcounter]]);
    array[counter] = auxiliaryArray[rcounter];
    counter++;
    rcounter++;
  }
}

//quicksort
export function getQuicksortAnimations(array) {
  if (array.length <= 1) return array;

  const animations = [];
  quicksort(array, 0, array.length - 1, animations);
  return animations;
}

function quicksort(array, lowIdx, highIdx, animations) {
  if (lowIdx < highIdx) {
    const j = partition(array, lowIdx, highIdx, animations);

    quicksort(array, lowIdx, j, animations);
    quicksort(array, j + 1, highIdx, animations);
  }
}

function partition(array, lowIdx, highIdx, animations) {
  const pivotIdx = lowIdx;

  let i = lowIdx;
  let j = highIdx;

  while (i < j) {
    animations.push([i, j]);
    animations.push([i, j]);
    animations.push([i, j]);
    do {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([i, array[i]]);
      i++;
    } while (array[i] < array[pivotIdx]);
    do {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([j, array[j]]);
      j--;
    } while (array[j] > array[pivotIdx]);
    if (i < j) {
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([i, array[j]]);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  animations.push([j, pivotIdx]);
  animations.push([j, pivotIdx]);
  animations.push([j, array[pivotIdx]]);
  const temp = array[pivotIdx];
  array[pivotIdx] = array[j];
  array[j] = temp;

  return j;
}

//bubblesort
export function getBubbleSortAnimations(array) {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  let limitIdx = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < limitIdx; j++) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([j, array[j]]);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, j]);
        animations.push([j + 1, j]);
        animations.push([j + 1, array[j]]);
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    limitIdx--;
  }
  console.log(array);
}

//insertionsort
export function getInsetionSortAnimations(array) {
  if (array.length <= 1) return array;

  const animations = [];
  insertionSort(array, animations);
  return animations;
}

function insertionSort(array, animations) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      animations.push([j - 1, j]);
      animations.push([j - 1, j]);
      animations.push([j - 1, array[j]]);
      animations.push([j, j - 1]);
      animations.push([j, j - 1]);
      animations.push([j, array[j - 1]]);
      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }
  }
}

//countingosrt
export function getCountingSortAnimations(array, maxNum) {
  const animations = [];
  countingSort(array, maxNum, animations);
  return animations;
}

function countingSort(array, maxNum, animations) {
  let arr = [];

  for (let i = 0; i <= maxNum; i++) {
    arr[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([i, array[i]]);
    arr[array[i]]++;
  }
  let j = 0;
  for (let i = 0; i <= arr.length; i++) {
    while (arr[i] > 0) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([j, i]);
      array[j] = i;
      j++;
      arr[i]--;
    }
  }
}

// dijkstra
export function djikstra(grid, startNode, endNode) {
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
    if (closestNode.isWall) continue; // ignore if wall
    if (closestNode.distance === Infinity) return visitedNodes; // stop condition; remaining nodes aren't reachable since the closest node has distance Infinity
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    updateDistances(grid, closestNode); // update distance of neighbors
  }
}

function updateDistances(grid, node) {
  const neighbors = [];

  if (node.col > 0) neighbors.push(grid[node.col - 1][node.row]);
  if (node.col < grid.length - 1) neighbors.push(grid[node.col + 1][node.row]);
  if (node.row > 0) neighbors.push(grid[node.col][node.row - 1]);
  if (node.row < grid[0].length - 1)
    neighbors.push(grid[node.col][node.row + 1]);

  const unvisitedNeighbors = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  ); // filter out visited neighbors

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
    if (closestNode.isWall) continue; // ignore if wall
    if (closestNode.distance === Infinity) return visitedNodes; // stop condition; remaining nodes aren't reachable since the closest node has distance Infinity
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === endNode) return visitedNodes;
    updateDistancesAstar(grid, closestNode, endNode); // update distance of neighbors
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
  ); // filter out visited neighbors

  for (const neighbor of unvisitedNeighbors) {
    const heuristic =
      Math.abs(endNode.col - neighbor.col) +
      Math.abs(endNode.row - neighbor.row);

    neighbor.distance = node.distance + 1 + heuristic; // A* is similar to Dijkstra's but adds an additional heuristic to the cost;
    neighbor.previousNode = node;
  }
}

export function getShortestPath(startNode, endNode) {
  const shortestPath = [];

  let node = endNode;

  while (node !== null) {
    shortestPath.unshift(node);
    node = node.previousNode;
  }

  return shortestPath;
}
