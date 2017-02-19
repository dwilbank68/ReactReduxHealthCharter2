import {
    LOAD_ALL_DAYS,
    UNAUTH_USER
} from '../actions/types';

const defaultState = {
    date:new Date(),
    chartJSData: {dietData:{}, statsData:{}}
};

var chartReducer = (state=defaultState, action) => {
    switch(action.type){
        case UNAUTH_USER:               return defaultState;
        case LOAD_ALL_DAYS:             return  { chartJSData:{...action.payload} }
        default: return state;
    };
};

export default chartReducer;