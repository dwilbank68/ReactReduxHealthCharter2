import axios from 'axios';
import {browserHistory} from 'react-router';
import Moment from 'moment';
import {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    LOAD_ALL_DAYS,
    LOAD_ALL_DAYS_PRINTABLE,
    LOAD_DAY_DATA,
    SUBMITTING,
    SUBMISSION_COMPLETE,
    UNAUTH_USER
} from './types';

import {arr2chart} from '../utils/arr2chart.js';

import {INITIALIZE} from 'redux-form';

// import {arr2chart} from '../utils/arr2chart.js';

import toastr from 'toastr';
toastr.options.preventDuplicates = true;
toastr.options.timeOut = 4;

const ROOT_URL = 'https://health-tracker-api.herokuapp.com';
// const ROOT_URL = 'http://localhost:3000';

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function changeDate(newDate, dateString) {

    return function (dispatch) {
        var newDateString;
        if (dateString) {
            newDateString = dateString.replace(/-/g, '');
        } else {
            newDateString = Moment(newDate).format('YYYYMMDD');
        }

        axios
            .get(`${ROOT_URL}/day/${newDateString}`, {
                headers: { 'x-auth':localStorage.getItem('token') }
            })
            .then(
                (response) => {

                    // if there is a document in the DB with that date, dispatch data from that document
                    // otherwise dispatch an empty object with the correct date property

                    if (response.data.day) {
                        var dayDataObj = response.data.day;
                        dayDataObj.date = new Date(dayDataObj.date);
                        // because in the response, date was converted to a string.
                        // For the calendar widget to be happy, it must be dispatched as an object
                        dispatch({
                            type: LOAD_DAY_DATA,
                            payload: dayDataObj
                        })

                    } else {

                        var dayDataObj = {};
                        dayDataObj.date = newDate;
                        dayDataObj.dateString = newDateString;

                        dispatch({
                            type: LOAD_DAY_DATA,
                            payload: dayDataObj
                        })
                    }

                },
                (err) => {
                    console.log('err in actions/index.js get day/:date', err);
                }
            )
    }


}

function convertData(daysData) {
    let arr2chartData = arr2chart(daysData.chartData);
    return {
        dietData: {
            type:'bar',
            data:arr2chartData.dietData,
            options:{
                chartArea: {
                    backgroundColor: 'rgba(200, 200, 200, 0.4)'
                },
                hover: { mode:'label'}, // single
                legend: { display:false },
                responsive:true,
                // title: {
                //     display:true,
                //     text:"whatever"
                // },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {display:false},
                        stacked: true
                    }],
                    yAxes: [
                        // {
                        //     position: 'left',
                        //     id:'y-axis-0',
                        //     ticks:{ min:0, suggestedMax:2000, fixedStepSize: 500 }
                        // },
                        {
                            position: 'right',
                            id:'y-axis-1',
                            ticks:{ min:0, suggestedMax:2000, fixedStepSize: 500 }
                        }
                    ]
                },
                tooltips: { mode:'label' } // single
            }
        },
        statsData: {
            type:'bar',
            data:arr2chartData.statsData,

            options:{
                hover: { mode:'label'}, // single
                legend: { display:false },
                responsive:true,
                // title: {
                //     display:true,
                //     text:"whatever"
                // },
                scales: {
                    xAxes: [{
                        // categorySpacing: 0,
                        stacked: true,
                        gridLines: {display:false}
                    }],
                    yAxes: [
                        // {
                        //     position: 'left',
                        //     id:'y-axis-0',
                        //     ticks:{ min:0, suggestedMax:180, fixedStepSize: 45 }
                        // },
                        {
                            position: 'right',
                            id:'y-axis-1',
                            ticks:{ min:0, suggestedMax:180, fixedStepSize: 45 }
                        }
                    ]
                },
                tooltips: { mode:'label' } // single
            }
        }
    };
}

export function fetchAllDays() {
    return function(dispatch){
        axios
            .get(ROOT_URL + '/days', {
                headers: { 'x-auth': localStorage.getItem('token') }
            })
            .then(
                (days) => {
                    // console.log('------------------------------------------');
                    // console.log('days.data.chartData ',days.data.chartData);
                    // console.log('------------------------------------------');
                    let daysforTable = days.data.chartData.map((day) => {
                        var bp='---', heartrate='---', weight='---',
                            waterTotal='---', saltTotal='---';
                        if (day.systolic && day.diastolic) bp = day.systolic +'/'+ day.diastolic;
                        if (day.heartrate) heartrate = day.heartrate + ' bpm';
                        if (day.weight > 0) weight = day.weight + ' lbs';
                        if (day.saltTotal) saltTotal = day.saltTotal + ' mg';
                        if (day.waterTotal) waterTotal = day.waterTotal + ' oz';
                        return {
                            date: day.date,
                            bp,
                            heartrate,
                            waterTotal,
                            saltTotal,
                            weight
                        }
                    })
                    let chartData = convertData(days.data);
                    // chartData contains .dietData & .statsData
                    // console.log('in fetchAllDays, chartData is', chartData);

                    dispatch({
                        type: LOAD_ALL_DAYS,
                        payload: chartData
                    });
                    dispatch({
                        type: LOAD_ALL_DAYS_PRINTABLE,
                        payload: daysforTable
                    });
                },
                (err) => {console.log('err', err)}
            )
            .catch(
                (err) => {
                    console.log('catch block of fetchData in actions/index.js', err);
                }
            )
    }
}

export function fetchUserInfo() {
    return function (dispatch) {

        axios
            .get(ROOT_URL + '/users/me', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then(
                (response) => {
                    dispatch({
                        type: FETCH_MESSAGE,
                        payload: {
                            id: response.data._id,
                            email: response.data.email
                        }
                    })
                },
                (err) => {
                    console.log('error in get /users/me', err);
                }
            )

    }
}

// export function loadReferenceList() {
//     return function(dispatch){
//         axios
//             .get('../sd')
//             .then(
//                 (days) => {
//                     let chartData = convertData(days.data);
//                     // chartData contains .dietData & .statsData
//                     console.log('in fetchAllDays, chartData is', chartData);
//
//                     dispatch({
//                         type: LOAD_ALL_DAYS,
//                         payload: chartData
//                     })
//                 },
//                 (err) => {console.log('err', err)}
//             )
//             .catch(
//                 (err) => {
//                     console.log('catch block of fetchData in actions/index.js', err);
//                 }
//             )
//     }
// }

export function signinUser({email, password}) {
    return function (dispatch) {
        dispatch({type: SUBMITTING});
        axios
            .post(`${ROOT_URL}/users/login`, {email, password})
            .then((response)=> {
                dispatch({type: AUTH_USER});
                localStorage
                    .setItem('token', response.headers['x-auth']);
                return true;
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: SUBMISSION_COMPLETE});
                    browserHistory.push('feature')
                }, 500);
            })
            .catch((e) => {
                console.error(e)
                dispatch(authError('bad login info'));
                dispatch({type: SUBMISSION_COMPLETE});
            })

    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function signupUser({email, password}) {
    return function (dispatch) {
        dispatch({type: SUBMITTING});
        axios
            .post(`${ROOT_URL}/users`, {email, password})
            .then(response=> {
                dispatch({type: AUTH_USER});
                localStorage
                    .setItem('token', response.headers['x-auth']);
                dispatch({type: SUBMISSION_COMPLETE});
                browserHistory.push('/feature');
            })
            .catch((e) => {
                dispatch(authError(e.response.data.error))
                dispatch({type: SUBMISSION_COMPLETE});

            })

    }
}

export function submitData(submitObj) {
    let momentDate = Moment(submitObj.date);
    return function (dispatch) {
        axios
            .post(
                `${ROOT_URL}/days`,
                submitObj,
                {headers: {'x-auth': localStorage.getItem('token')}}
            )
            .then(
                (response) => {
                    toastr.success('Day updated');
                    dispatch(fetchAllDays());
                },
                (err) => {
                    console.log('error in post /days', err);
                    toastr.error(err);
                }
            )
            .catch((err) => {
                console.log('error in catch block of post /days', err);
            })
    }

    return {
        type: 'SUBMIT'
    }

}

