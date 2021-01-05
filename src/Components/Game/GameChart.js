import React from 'react';
import {
    ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class GameChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            axes: [
                { primary: true, type: 'ordinal', position: 'left' },
                { position: 'bottom', type: 'linear', stacked: true }
            ],
            series: {
                type: 'bar'
            },
            chartData: [
                {
                    name: 'Correct', score: 0,
                },
                {
                    name: 'Incorrect', score: 0,
                },
                {
                    name: 'Total', score: 0,
                },
            ],
            chartLayout: {
                title: 'Math Game Results',
                yaxis: {
                    showticklabels: false
                },

            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chartData.totalCounter !== this.state.chartData[2].score) {
            let tempState = this.state;
            tempState.chartData = [
                {
                    name: 'Correct', score: this.props.chartData.correctCounter,
                },
                {
                    name: 'Incorrect', score: this.props.chartData.incorrectCounter,
                },
                {
                    name: 'Total', score: this.props.chartData.totalCounter,
                },
            ];
            this.setState(tempState);
        }
    }

    render () {
        return (
            <div>
                {
                    (this.state.chartData[2].score > 0) ?
                        (<BarChart
                            layout="horizontal"
                            width={500}
                            height={300}
                            data={this.state.chartData.slice()}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Bar dataKey="score" fill="#82ca9d" />
                        </BarChart>): (null)
                }
            </div>
        );
    }
}
