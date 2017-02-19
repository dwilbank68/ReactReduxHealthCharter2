import React, {Component, PropTypes} from 'react';
let shallowCompare = require('react-addons-shallow-compare');

import ChartJS from 'chart.js';

import * as actions from '../actions';

ChartJS.defaults.global.hover.animationDuration = 400;
ChartJS.defaults.global.title.padding = 10;
ChartJS.defaults.global.legend.position = 'left';
ChartJS.defaults.global.defaultFontFamily = 'KnockoutHTF52Cruiserweight';
ChartJS.defaults.global.defaultFontSize = 10;
ChartJS.defaults.global.padding = {top:5};
ChartJS.defaults.global.tooltips.bodyFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
ChartJS.defaults.global.tooltips.titleFontSize = 12;
ChartJS.defaults.global.tooltips.bodyFontSize = 12;
// ChartJS.defaults.global.tooltips.titleSpacing = 2;
ChartJS.defaults.global.tooltips.yPadding = 12;

class ChartStats extends Component {

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.killChart();
        this.createChart();
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

        var clickableChart = document.getElementsByClassName("chart-stats")[0];
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="chart row">


                <div className="col-xs-2 chart-legend">
                    <div className="col-xs-12 legend-box leg-weight">Weight (lbs)</div>
                    <div className="col-xs-12 legend-box leg-sys">Systolic (mmHg)</div>
                    <div className="col-xs-12 legend-box leg-heartrate">Heartrate (bpm)</div>
                    <div className="col-xs-12 legend-box leg-dia">Diastolic (mmHg)</div>
                </div>

                <div className="col-xs-10">
                    <canvas className="chart-stats" ref="chart"
                            width={this.props.width} height={this.props.height}/>
                </div>


            </div>

        );
    }
}

export default ChartStats;