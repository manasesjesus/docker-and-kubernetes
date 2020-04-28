import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
    state = {
        seenIndexes: [ ],
        values: { },
        index: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues () {
        const values = await axios.get("/api/values/current");
        this.setState({ values: values.data });
    }

    async fetchIndexes () {
        const seenIndexes = await axios.get("/api/values/all");
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post("/api/values", {
            index: this.state.index
        });
        this.setState({ index: '' });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(", ");
    }

    renderCalculatedValues () {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    Fibonacci of {key} is {this.state.values[key]} 
                </div>
            );
        }

        return entries;
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index: </label>
                    <input 
                        value={this.state.index} 
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Calculate</button>
                </form>
                <p><br /></p>
                <h3>Seen indexes:</h3>
                { this.renderSeenIndexes() }

                <h3>Calculated values:</h3>
                { this.renderCalculatedValues() }
            </div>
        );
    }
};

export default Fib;
