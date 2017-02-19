import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import statsReducer from './stats_reducer';
import chartReducer from './chart_reducer';
import printableChartReducer from './printable_chart_reducer';
import listReducer from './list_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    stats: statsReducer,
    chart: chartReducer,
    printableChart: printableChartReducer,
    list: listReducer
});

export default rootReducer;
