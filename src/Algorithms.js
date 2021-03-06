// mergesort
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

// quicksort
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

// bubblesort
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

// insertion sort
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

// counting sort
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
