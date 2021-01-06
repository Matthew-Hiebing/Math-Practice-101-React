import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';


export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: [
                {
                    name: 'Correct', score: this.props.chartData.correctCounter,
                },
                {
                    name: 'Incorrect', score: this.props.chartData.incorrectCounter,
                },
                {
                    name: 'Total', score: this.props.chartData.totalCounter,
                }
            ]
        }
    }

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={this.state.chartData.slice()}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
        );
    }
}
