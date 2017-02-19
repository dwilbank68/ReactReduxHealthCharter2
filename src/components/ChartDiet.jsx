import React, {Component, PropTypes} from 'react';
var shallowCompare = require('react-addons-shallow-compare');

import ChartJS from 'chart.js';

import * as actions from '../actions';

// to give chart a background color
ChartJS.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});

class ChartDiet extends Component {

    componentDidMount() {
        this.createChart();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState);
    }


    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps !== this.props) {
            this.killChart();
            this.createChart();
        }
    }

    componentWillUnmount() {
        this.killChart();
    }

    createChart(){
        const ctx = this.refs['chart']
                        .getContext('2d');
        let {type, data, options} = this.props;
        this.chart = new ChartJS(ctx, {
            type, data, options
        });

        var clickableChart = document.getElementsByClassName("chart-diet")[0];
        var {dispatch} = this.props;
        clickableChart.onclick = (e) => {
            var activeElement = this.chart.getElementAtEvent(e);
            if (activeElement[0]) {
                let dateString = activeElement[0]._view.label;
                let newDate = new Date(`${dateString} PST`);
                dispatch(actions.changeDate(newDate));
            }
        };
    }

    killChart(){
        this.chart && this.chart.destroy();
    }

    render() {
        return (
            <div className="chart row">


                <div className="col-xs-2 chart-legend">
                    <div className="col-xs-12 legend-box leg-salt">Total Salt (mg)</div>
                    <div className="col-xs-12 legend-box leg-water">Total Water (oz)</div>
                </div>

                <div className="col-xs-10">
                    <canvas className="chart-diet" ref="chart"
                            width={this.props.width} height={this.props.height}/>
                </div>


            </div>

        );
    }
}

export default ChartDiet;