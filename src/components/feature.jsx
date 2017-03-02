import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import calculatedTotals from '../calculators/calculateTotals.js';
import _ from 'lodash';
import axios from 'axios';
// react-widgets Calendar

import 'react-widgets/lib/less/react-widgets.less';
import Calendar from "react-widgets/lib/Calendar";
import ChartDiet from './ChartDiet.jsx';
import ChartStats from './ChartStats.jsx';
import FoodList from './FoodList/FoodList.jsx';
import SearchBar from './FoodList/SearchBar.jsx';
import SaltDisplay from './FoodList/SaltDisplay.jsx';
import PrintableList from './PrintableList/PrintableList.jsx';
import * as colors from '../utils/calculateColors.js';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

import * as actions from '../actions';

import CountTo from 'react-count-to';

require('../../style/style.scss');

// require('../../style/dietTable.scss');
// require('../../style/navbar.scss');
// require('../../style/charts.scss');
// require('../../node_modules/toastr/build/toastr.min.css');

import 'react-table/react-table.css';

require('../KnockoutHTF27JuniorBantamwt.scss');
require('../KnockoutHTF31JuniorMiddlewt.scss');
require('../KnockoutHTF34JuniorSumo.scss');
require('../KnockoutHTF52Cruiserweight.scss');
require('../KnockoutHTF67FullBantamwt.scss');
require('../LeviathanHTFBlack.scss');
require('../SaracenHTFBlack.scss');
require('../SentinelBlackItalic.scss');
require('../SentinelBold.scss');
require('../SentinelMedium.scss');
require('../SentinelSemiBold.scss');
require('../SentinelSemiboldItalic.scss');
require('../ZigguratHTFBlack.scss');
require('../ZigguratHTFBlackItalic_1.scss');

const maxBP = (value) => {
    if (parseInt(value) > 250) return 250;
    return value;
}

const maxSalt = (value) => {
    if (parseInt(value) > 999) return 999;
    return value;
}
const maxWater = (value) => {
    if (parseInt(value) > 64) return 64;
    return value;
}

class Feature extends Component {

    componentDidMount() {
        require('../utils/preventParentScroll.js');
        require('../utils/preventParentScroll2.js');
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.selectedFood) {
            if (nextState.selectedFood.nix_item_id !== this.state.selectedFood.nix_item_id) {
                this.saltSearch(nextState.selectedFood.nix_item_id);
            }
        }

    }

    componentWillMount() {
        this.props.fetchUserInfo();
        this.props.fetchAllDays();
        // set date to current date
        this.props.changeDate(new Date());
        // this.props.loadReferenceList();
    }

    constructor(props) {
        super(props);
        this.state = {
            foods:[],
            selectedFood:{nix_item_id:''},
            foodInfo: {}
        }
        this.submit = this.submit.bind(this);
    }

    foodSearch(term){
        const ROOT_URL = 'https://trackapi.nutritionix.com/v2/search/instant?query=';
        axios
            .get(ROOT_URL + term, {
                headers: {
                    'Content-Type':'application/json',
                    'x-app-id': process.env.X_APP_ID,
                    'x-app-key': process.env.X_APP_KEY
                }
            })
            .then(
                (response) => {
                    var list = response.data.branded;
                    var filteredList = list.map((obj) => {
                        return {
                            brand_name: obj.brand_name,
                            food_name: obj.food_name,
                            nix_item_id: obj.nix_item_id,
                            photo: obj.photo.thumb
                        }
                    })
                    // console.log('filteredList' , JSON.stringify(filteredList , null, 2));
                    this.setState({
                        foods:filteredList
                    })
                },
                (err) => { console.log('err in foodSearch', err); }
            )
    }

    saltSearch(id){
        const ROOT_URL = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=';
        axios
            .get(ROOT_URL + id, {
                headers: {
                    'Content-Type':'application/json',
                    'x-app-id': process.env.X_APP_ID,
                    'x-app-key': process.env.X_APP_KEY
                }
            })
            .then(
                (response) => {
                    const food = response.data.foods[0];
                    const foodObj = {
                        brand:  food.brand_name,
                        name:  food.food_name,
                        qty: food.serving_qty,
                        unit: food.serving_unit,
                        salt: food.nf_sodium
                    }
                    console.log('foodObj' , JSON.stringify(foodObj , null, 2));
                    this.setState({
                        foodInfo: foodObj
                    })
                },
                (err) => { console.log('err in saltSearch', err); }
            )
    }

    submit(values) {
        const {dispatch} = this.props;
        var dateString;
        if (values.dateString) {
            dateString = values.dateString;
        } else {
            dateString = Moment(this.props.date).format('YYYYMMDD');
        }
        let submitObj = {
            ...values,
            dateString: dateString,
            saltTotal: this.props.totals.saltTotal,
            waterTotal: this.props.totals.waterTotal
        };
        dispatch(actions.submitData(submitObj))
    }

    render() {

        const foodSearch = _.debounce((term) => { this.foodSearch(term) }, 500);

        var handleDateChange = (newDate) => {
            var {dispatch} = this.props;
            dispatch(actions.changeDate(newDate));
        };

        const {handleSubmit, pristine, invalid, submitting, printableData} = this.props;
        const {date} = this.props.fields;

        return (
            <div className="feature">

                <div className="row">
                    <div className="col-xs-9 top-left">
                        <div className="top-left food-list-box">
                            <div className="search-salt-container">
                                <SearchBar  onSearchTermChange={foodSearch} />
                                <SaltDisplay foodInfo={this.state.foodInfo}/>
                            </div>
                            <FoodList   onFoodSelect={selectedFood => this.setState({selectedFood}) }
                                        foods={this.state.foods} />
                        </div>
                    </div>
                    <div className="col-xs-3 top-right">
                        <Calendar   className="calendar" {...date}
                                    value={this.props.date}
                                    onChange={handleDateChange}/>
                    </div>
                </div>


                <form onSubmit={handleSubmit(this.submit)}>

                    <div className="row">
                        <div className="col-xs-3 meal-column">
                            <section className="breakfast">
                                <h3 className="meal-header text-center breakfast-header">BREAKFAST</h3>
                                {this.renderFields('breakfast')}
                            </section>
                        </div>
                        <div className="col-xs-3 meal-column">
                            <section className="lunch">
                                <h3 className="meal-header text-center">LUNCH</h3>
                                {this.renderFields('lunch')}
                            </section>
                        </div>
                        <div className="col-xs-3 meal-column">
                            <section className="dinner">
                                <h3 className="meal-header text-center">DINNER</h3>
                                {this.renderFields('dinner')}
                            </section>
                        </div>

                        <section className="col-xs-3 stats2box">
                            <h3 className="meal-header text-center">STATS</h3>
                            <table className="stats">
                                <tbody>
                                <tr>
                                    <td className="header-cell">WEIGHT</td>
                                    <td>
                                        <Field name="weight" component="input"
                                               type="number" min="0" max="1000" step="0.5"
                                               className="form-control stat-input weight"
                                               normalize={maxSalt}/>
                                    </td>
                                    <td className="units-box">lbs</td>
                                </tr>

                                <tr>
                                    <td className="legend" colSpan="3">
                                        Ideal systolic: &nbsp;90-120, diastolic: &nbsp;60-80
                                    </td>
                                </tr>

                                <tr>
                                    <td className="header-cell">BLOOD PRESSURE</td>
                                    <td className="stat-input-bp-parent">
                                        <div className={"input-wrapper"}
                                             style={{borderBottom: '4px solid ' + colors.calcSystolicColor(this.props.systolic)}}>
                                            <Field name="systolic"
                                                   component="input"
                                                   type="number" min="0" max="250" step="1"
                                                   className="stat-input-bp-sys bp"
                                                   normalize={maxBP}/>
                                        </div>
                                        <div className={"input-wrapper"}
                                             style={{borderBottom: '4px solid ' + colors.calcDiastolicColor(this.props.diastolic)}}>
                                            <Field name="diastolic"
                                                   component="input"
                                                   type="number" min="0" max="250" step="1"
                                                   className="stat-input-bp-dia bp"
                                                   normalize={maxBP}/>
                                        </div>
                                    </td>
                                    <td className="units-box">mmHg</td>
                                </tr>

                                <tr>
                                    <td className="header-cell">HEARTRATE</td>
                                    <td>
                                        <Field name="heartrate"
                                               component="input" type="number" min="0" max="300"
                                               className="form-control stat-input heartrate"
                                               normalize={maxBP}/>
                                    </td>
                                    <td className="units-box">bpm</td>
                                </tr>

                                <tr>
                                    <td className="legend" colSpan="3"> Daily Salt Max: &nbsp;2000 mg</td>
                                </tr>

                                <tr>
                                    <td className="header-cell">TOTAL SALT</td>
                                    <td className="">
                                        <div className="total input-wrapper"
                                             style={{borderBottom: '4px solid ' + colors.calcSaltColor(this.props.totals.saltTotal)}}>
                                            {/*{this.props.totals.saltTotal}*/}
                                            <CountTo to={this.props.totals.saltTotal} speed={750}/>
                                        </div>
                                    </td>
                                    <td className="units-box">mg</td>
                                </tr>

                                <tr>
                                    <td className="legend" colSpan="3"> Daily Water Max: &nbsp;64 oz</td>
                                </tr>

                                <tr>
                                    <td className="header-cell">TOTAL WATER</td>
                                    <td className="">
                                        <div className={'total input-wrapper'}
                                             style={{borderBottom: '4px solid ' + colors.calcWaterColor(this.props.totals.waterTotal)}}>
                                            {/*{this.props.totals.waterTotal}*/}
                                            <CountTo to={this.props.totals.waterTotal} speed={750}/>
                                        </div>
                                    </td>

                                    <td className="units-box">oz</td>
                                </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>

                    <div className="row text-center">
                        <button type="submit"
                                className="submit button btn btn-default"
                                disabled={ submitting || invalid || pristine}>
                            Submit
                        </button>
                    </div>

                </form>

                <div className="chart-row">
                    <ChartDiet  {...this.props.dietData} width="800" height="150"
                                dispatch={this.props.dispatch}/>

                    <ChartStats {...this.props.statsData} width="800" height="200"
                                dispatch={this.props.dispatch}/>
                </div>

                <div className="row bottom-row">
                    <div className="col-xs-12 bottom-left text-center">
                        <PrintableList list={printableData}/>
                    </div>
                </div>


            </div>
        );
    }

    renderFields(meal) {
        return (
            <div className="row">
                <div className="col-lg-12 text-center heading">Salt (mg)</div>
                <Field name={`${meal}_salt_1`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_salt_amt_1`}
                       component="input" type="number" min="0" max="2000" step="1"
                       className="col-lg-4 amt"
                       normalize={maxSalt}/>
                <Field name={`${meal}_salt_2`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_salt_amt_2`}
                       component="input" type="number" min="0" max="2000" step="1"
                       className="col-lg-4 amt"
                       normalize={maxSalt}/>
                <Field name={`${meal}_salt_3`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_salt_amt_3`}
                       component="input" type="number" min="0" max="2000" step="1"
                       className="col-lg-4 amt"
                       normalize={maxSalt}/>
                <Field name={`${meal}_salt_4`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_salt_amt_4`}
                       component="input" type="number" min="0" max="2000" step="1"
                       className="col-lg-4 amt"
                       normalize={maxSalt}/>
                <div className="subtotals">
                    <span className="col-lg-8 sub-total-item">Total: </span>
                    <span className="col-lg-4 sub-total-amt">
                        {/*{eval(`this.props.totals.${meal}SaltTotal`)}*/}
                        <CountTo to={eval(`this.props.totals.${meal}SaltTotal`)} speed={750}/>
                    </span>
                </div>

                <div className="col-lg-12 text-center heading water">Water (oz)</div>
                <Field name={`${meal}_water_1`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_water_amt_1`}
                       component="input" type="number" min="0" max="100" step="0.1"
                       className="col-lg-4 amt"
                       normalize={maxWater}/>
                <Field name={`${meal}_water_2`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_water_amt_2`}
                       component="input" type="number" min="0" max="100" step="0.1"
                       className="col-lg-4 amt"
                       normalize={maxWater}/>
                <Field name={`${meal}_water_3`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_water_amt_3`}
                       component="input" type="number" min="0" max="100" step="0.1"
                       className="col-lg-4 amt"
                       normalize={maxWater}/>
                <Field name={`${meal}_water_4`}
                       component="input" type="text"
                       className="col-lg-8 item"/>
                <Field name={`${meal}_water_amt_4`}
                       component="input" type="number" min="0" max="100" step="0.1"
                       className="col-lg-4 amt"
                       normalize={maxWater}/>
                <div className="subtotals">
                    <span className="col-lg-8 sub-total-item">Total: </span>
                    <span className="col-lg-4 sub-total-amt">
                        {/*{eval(`this.props.totals.${meal}WaterTotal`)}*/}
                        <CountTo to={eval(`this.props.totals.${meal}WaterTotal`)} speed={750}/>
                    </span>
                </div>
            </div>
        )
    }
}


Feature.propTypes = {};
Feature.defaultProps = {};

var configObj = {
    form: 'StatsForm',
    enableReinitialize: true,
    fields: ['date']
};


function mapStateToProps(state) {
    const statForm = _.get(state, 'form.StatsForm.values', {diastolic: 0, systolic: 0});
    const chartForm = state.chart.chartJSData;
    return {
        calcSaltColor: colors.calcSaltColor,
        totals: calculatedTotals(state),
        date: state.stats.date,
        // diastolic: _.get(state, 'form.StatsForm.values.diastolic', 0),
        diastolic: statForm.diastolic,
        systolic: statForm.systolic,
        dietData: chartForm.dietData,
        statsData: chartForm.statsData,
        initialValues: state.stats,
        printableData: state.printableChart.printableData
    }
}

var myForm = reduxForm(configObj)(Feature);
var myConnectedForm = connect(mapStateToProps, actions)(myForm);
export default myConnectedForm;