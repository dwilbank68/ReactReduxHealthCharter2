import {
    LOAD_ALL_DAYS_PRINTABLE,
    UNAUTH_USER
} from '../actions/types';

const defaultState = {
    printableData: []
};

var printableChartReducer = (state=defaultState, action) => {
    switch(action.type){
        case UNAUTH_USER:               return defaultState;
        case LOAD_ALL_DAYS_PRINTABLE:   return  { printableData:action.payload }
        default: return state;
    };
};

export default printableChartReducer;