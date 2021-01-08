import React from 'react';
import {
    ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const barColors = ["#34ed4180", "#ff000080", "#1e21c980"]

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
                    name: 'Correct',
                    total: 0,
                },
                {
                    name: 'Incorrect',
                    total: 0,
                },
                {
                    name: 'Total',
                    total: 0,
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
        if (prevProps.chartData.totalCounter !== this.state.chartData[2].total) {
            let tempState = this.state;
            tempState.chartData = [
                {
                    name: 'Correct',
                    total: this.props.chartData.correctCounter,
                },
                {
                    name: 'Incorrect',
                    total: this.props.chartData.incorrectCounter,
                },
                {
                    name: 'Total',
                    total: this.props.chartData.totalCounter,
                },
            ];
            this.setState(tempState);
        }
    }

    render () {
        return (
            <div>
                {
                    (this.state.chartData[2].total > 0) ?
                        (<ResponsiveContainer width="95%" height={225}>
                            <BarChart
                                data={this.state.chartData.slice()}
                                layout="vertical" barCategoryGap={5}
                                margin={{top: 5, right: 30, left: 20, bottom: 5,}}
                            >
                                <XAxis
                                    type="number"
                                    stroke="#000000"
                                />
                                <YAxis
                                    type="category"
                                    stroke="#000000"
                                    dataKey="name"
                                />
                                <Tooltip
                                    wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}
                                    formatter={function(name) {return `${name}`}}
                                />
                                <Bar
                                    dataKey="total"
                                    stroke="#000000"
                                    strokeWidth={1}
                                >
                                    {
                                        this.state.chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={barColors[index]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        ):
                        (null)
                }
            </div>
        );
    }
}
