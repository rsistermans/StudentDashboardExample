import React, { Component } from 'react';
import BarChart from '../BarChart/BarChart';
import data from '../../data/data';

class App extends Component {

    state = {
        ...data
    };

    render() {
        return (
            <div className="App">
                <h1>Student Dashboard</h1>
                <BarChart ratings={this.state.ratings} />
            </div>
        );
    }

}

export default App;
