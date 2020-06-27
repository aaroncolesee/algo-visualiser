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
        for ( let i = 0; i < this.state.numBars; i++ ) {
            array.push(randomIntFromInterval(5, 850));
        }
        this.setState({array});
    }

    mergesort() {
        const animations = algorithms.getMergesortAnimations(this.state.array);
        for(let i=0; i<animations.length; i++) {
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
    }

    quicksort() {
        const array = algorithms.quicksort(this.state.array);
        this.setState({array});
    }

    onSliderChange = (event) => {
        this.setState({numBars: event.target.value})
        this.resetArray();
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
                <button onClick={() => this.resetArray()}>Randomize</button>
                <button onClick={() => this.mergesort()}>Merge Sort</button>
                <input type='range' min='10' max='250' value={this.state.numBars} className='slider' onChange={this.onSliderChange}></input>
                <div className='value'>{this.state.numBars}</div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualiser;