import {createSelector} from 'reselect';
import _ from 'lodash';

const statsSelector = (state) => {
    return _.get(state, 'form.StatsForm.values', {
        diastolic:0,
        systolic:0
    });
}

const addTotalsToState = (stats) => {

    var totalsObj = {
        breakfastSaltTotal: 0, breakfastWaterTotal: 0,
        lunchSaltTotal: 0, lunchWaterTotal: 0,
        dinnerSaltTotal: 0, dinnerWaterTotal: 0,
        snackSaltTotal: 0, snackWaterTotal: 0,
        saltTotal: 0, waterTotal: 0
    };
    for (var stat in stats) {
        if (stat.search('breakfast') >= 0) {
            if (stat.search('salt_amt') >= 0) totalsObj.breakfastSaltTotal += +stats[stat];
            if (stat.search('water_amt') >= 0) totalsObj.breakfastWaterTotal += +stats[stat];
        } else if (stat.search('lunch') >= 0) {
            if (stat.search('salt_amt') >= 0) totalsObj.lunchSaltTotal += +stats[stat];
            if (stat.search('water_amt') >= 0) totalsObj.lunchWaterTotal += +stats[stat];
        } else if (stat.search('dinner') >= 0) {
            if (stat.search('salt_amt') >= 0) totalsObj.dinnerSaltTotal += +stats[stat];
            if (stat.search('water_amt') >= 0) totalsObj.dinnerWaterTotal += +stats[stat];
        } else if (stat.search('snack') >= 0) {
            if (stat.search('salt_amt') >= 0) totalsObj.snackSaltTotal += +stats[stat];
            if (stat.search('water_amt') >= 0) totalsObj.snackWaterTotal += +stats[stat];
        }
    }

    totalsObj.saltTotal = totalsObj.breakfastSaltTotal +
        totalsObj.lunchSaltTotal +
        totalsObj.dinnerSaltTotal +
        totalsObj.snackSaltTotal;

    totalsObj.waterTotal = totalsObj.breakfastWaterTotal +
        totalsObj.lunchWaterTotal +
        totalsObj.dinnerWaterTotal +
        totalsObj.snackWaterTotal;

    return totalsObj;
};

export default createSelector(
    statsSelector,
    addTotalsToState
);