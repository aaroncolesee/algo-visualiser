import React from 'react';
import * as algorithms from '../Algorithms.js';

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array : [],
            numBars: 50
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.numBars; i++) {
            array.push(randomIntFromInterval(5, 850));
        }
        this.setState({array});
    }

    mergesort() {
        this.disableButtons();

        const animations = algorithms.getMergesortAnimations(this.state.array);
        for (let i=0; i<animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i%3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i%3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            
        }

        setTimeout(() => {
            this.enableButtons();
        }, animations.length * ANIMATION_SPEED_MS);
    }

    quicksort() {
        this.disableButtons();

        const animations = algorithms.getQuicksortAnimations(this.state.array);
        for (let i=0; i<animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i%3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i%3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(() => {
            this.enableButtons();
        }, animations.length * ANIMATION_SPEED_MS);
    }

    insertionSort() {
        this.disableButtons();

        const animations = algorithms.getInsetionSortAnimations(this.state.array);
        for (let i=0; i<animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i%3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i%3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(() => {
            this.enableButtons();
        }, animations.length * ANIMATION_SPEED_MS);
    }

    countingSort() {
        this.disableButtons();

        const animations = algorithms.getCountingSortAnimations(this.state.array, 850);
        for (let i=0; i<animations.length; i++) {
            const bars = document.getElementsByClassName('bar');
            const isColorChange = i%3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = bars[barOneIdx].style;
                const barTwoStyle = bars[barTwoIdx].style;
                const color = i%3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }

        setTimeout(() => {
            this.enableButtons();
        }, animations.length * ANIMATION_SPEED_MS);
    }

    onSliderChange = (event) => {
        this.setState({numBars: event.target.value})
        this.resetArray();
    }

    disableButtons() {
        document.getElementById('slider').disabled = true;
        document.getElementById('randomize-button').disabled = true;
        document.getElementById('mergesort-button').disabled = true;
        document.getElementById('quicksort-button').disabled = true;
        document.getElementById('insertionsort-button').disabled = true;
    }

    enableButtons() {
        document.getElementById('slider').disabled = false;
        document.getElementById('randomize-button').disabled = false;
        document.getElementById('mergesort-button').disabled = false;
        document.getElementById('quicksort-button').disabled = false;
        document.getElementById('insertionsort-button').disabled = false;
    }


    render() {
        const { array } = this.state;
        return (
            <div>
                <div className='container'>
                    {array.map((value, idx) => (
                        <div className='bar' key={idx} style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`, width: `${1200/this.state.numBars}px`}}></div>
                    ))}
                </div>
                <button id='randomize-button' onClick={() => this.resetArray()}>Randomize</button>
                <button id='mergesort-button' onClick={() => this.mergesort()}>Merge Sort</button>
                <button id='quicksort-button' onClick={() => this.quicksort()}>Quick Sort</button>
                <button id='insertionsort-button' onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button id='countingsort-button' onClick={() => this.countingSort()}>Counting Sort</button>
                <input type='range' min='10' max='250' value={this.state.numBars} id='slider' className='slider' onChange={this.onSliderChange}></input>
                <div className='value'>{this.state.numBars}</div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualiser;