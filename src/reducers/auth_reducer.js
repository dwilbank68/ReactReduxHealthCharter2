import {
    AUTH_ERROR,
    AUTH_USER,
    FETCH_MESSAGE,
    SUBMISSION_COMPLETE,
    SUBMITTING,
    UNAUTH_USER
} from '../actions/types';

const defaultState = {user:{}, submitting: false};
var authReducer = (state=defaultState, action) => {
    switch(action.type){
        case AUTH_USER: return      {...state, error: '', authenticated: true};
        case UNAUTH_USER: return    defaultState;
        case AUTH_ERROR: return     {...state, error: action.payload};
        case FETCH_MESSAGE: return  {
            ...state,
            user: {
                email: action.payload.email,
                id: action.payload.id
            }
        };
        case SUBMITTING: return {...state, submitting: true};
        case SUBMISSION_COMPLETE: return {...state, submitting: false};
        default: return state;
    };
};

export default authReducer;