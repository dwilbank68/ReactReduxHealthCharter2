import {
    LOAD_FOODS
} from '../actions/types';

const defaultState = {list:[]};

var listReducer = (state=defaultState, action) => {
    switch(action.type){
        case LOAD_FOODS: return {
            ...state, list: action.payload
        }
        default: return state;
    };
};

export default listReducer;