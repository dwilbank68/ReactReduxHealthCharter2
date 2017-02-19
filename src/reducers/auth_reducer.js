import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/types';

const defaultState = {user:{}};
var authReducer = (state=defaultState, action) => {

    switch(action.type){
        case AUTH_USER: return      {...state, error: '', authenticated: true};
        case UNAUTH_USER: return    defaultState;
        case AUTH_ERROR: return     {...state, error: action.payload};
        case FETCH_MESSAGE: return  {...state, user: {
                                                        email: action.payload.email,
                                                        id: action.payload.id
                                                    }};
        default: return state;
    };
};

export default authReducer;