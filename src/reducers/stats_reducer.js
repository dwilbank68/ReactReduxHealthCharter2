import {
    CHANGE_DATE,
    LOAD_DAY_DATA,
    UNAUTH_USER
} from '../actions/types';

// function calculateTotals(stats){
//     var totalsObj = {
//         breakfastSaltTotal:0, breakfastWaterTotal:0,
//         lunchSaltTotal:0, lunchWaterTotal:0,
//         dinnerSaltTotal:0, dinnerWaterTotal:0,
//         snackSaltTotal:0, snackWaterTotal:0,
//         saltTotal: 0, waterTotal: 0
//     };
//     for (var stat in stats) {
//         if (stat.search('breakfast') >=0 ) {
//             if (stat.search('salt_amt') >=0) totalsObj.breakfastSaltTotal += +stats[stat];
//             if (stat.search('water_amt') >=0) totalsObj.breakfastWaterTotal += +stats[stat];
//         } else if (stat.search('lunch') >=0 ){
//             if (stat.search('salt_amt') >=0) totalsObj.lunchSaltTotal += +stats[stat];
//             if (stat.search('water_amt') >=0) totalsObj.lunchWaterTotal += +stats[stat];
//         } else if (stat.search('dinner') >=0 ) {
//             if (stat.search('salt_amt') >=0) totalsObj.dinnerSaltTotal += +stats[stat];
//             if (stat.search('water_amt') >=0) totalsObj.dinnerWaterTotal += +stats[stat];
//         } else if (stat.search('snack') >=0 ) {
//             if (stat.search('salt_amt') >=0) totalsObj.snackSaltTotal += +stats[stat];
//             if (stat.search('water_amt') >=0) totalsObj.snackWaterTotal += +stats[stat];
//         }
//     }
//
//     totalsObj.saltTotal =   totalsObj.breakfastSaltTotal +
//                             totalsObj.lunchSaltTotal +
//                             totalsObj.dinnerSaltTotal +
//                             totalsObj.snackSaltTotal;
//
//     totalsObj.waterTotal =  totalsObj.breakfastWaterTotal +
//                             totalsObj.lunchWaterTotal +
//                             totalsObj.dinnerWaterTotal +
//                             totalsObj.snackWaterTotal;
//
//     // console.log('totalsObj',totalsObj);
//
//     if (totalsObj.saltTotal > 9999)     totalsObj.saltTotal = 9999;
//     if (totalsObj.waterTotal > 9999)    totalsObj.waterTotal = 9999;
//
//     return totalsObj;
// }

const defaultState = {date:new Date()};

var statsReducer = (state=defaultState, action) => {

    switch(action.type){
        case UNAUTH_USER: return defaultState;
        case CHANGE_DATE: return    {...state, date: action.payload};
        case LOAD_DAY_DATA:
            let dayData = action.payload;
            if (dayData) {
                delete dayData._id;
                delete dayData._creator;
                delete dayData.__v;
                // dayData.date = new Date(dayData.date);
            }
            return  { ...dayData }
        default: return state;
    };
};

export default statsReducer;