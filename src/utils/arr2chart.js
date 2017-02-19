import * as colors from './calculateColors.js';

export function arr2chart(arr) {

    let formattedData = {
        dietData: {
            labels: [], datasets: []
        },
        statsData: {
            labels: [], datasets: []
        }
    };

    let map = {
        dietData: {},
        statsData: {}
    };

    arr.forEach((dayObject, i, a) => {
        formattedData.dietData.labels.push(dayObject.date.toString().slice(0,10));
        formattedData.statsData.labels.push(dayObject.date.toString().slice(0,10));
        for (let prop in dayObject){
            if (prop === 'date') continue;
            if (prop === 'saltTotal' || prop === 'waterTotal') {
                if (!map.dietData[prop]) map.dietData[prop] = [];
                map.dietData[prop].push(dayObject[prop]);
            } else {
                if (!map.statsData[prop]) map.statsData[prop] = [];
                map.statsData[prop].push(dayObject[prop]);
            }
        }
    })

    window.map = map;
    // map.dietData = map.dietData;

    let dataCount = formattedData.dietData.labels.length,
        waterColorsArr = [],
        saltColorsArr = [],
        diastolicColorsArr = [],
        systolicColorsArr = [];

    for(var i = 0; i < dataCount; i++){
        diastolicColorsArr.push(    colors.calcDiastolicColor(map.statsData.diastolic[i]))
        systolicColorsArr.push(     colors.calcSystolicColor(map.statsData.systolic[i]))
        waterColorsArr.push(        colors.calcWaterColor(map.dietData.waterTotal[i]))
        saltColorsArr.push(         colors.calcSaltColor(map.dietData.saltTotal[i]))
    }

    var backgroundColor, hoverBackgroundColor,
        borderColor, borderWidth,
        pointHoverRadius = 2, pointRadius = 0,
        type,
        yAxisID;

    for (let prop in map.dietData) {
        if (prop == 'waterTotal') {
            backgroundColor = 'rgba(80,147,163,.5)';
            hoverBackgroundColor = waterColorsArr;
            yAxisID ='y-axis-1';
        }
        if (prop == 'saltTotal')  {
            backgroundColor = 'rgba(256,256,256,.5)';
            hoverBackgroundColor = saltColorsArr;
            yAxisID ='y-axis-1';
        }

        formattedData.dietData.datasets.push({
            backgroundColor, hoverBackgroundColor,
            label: prop,
            data: map.dietData[prop],
            yAxisID
        })
        formattedData.dietData.datasets = formattedData.dietData.datasets.reverse();
        // so the short waterTotal bars display in front of the tall saltTotal bars
    }

    for (let prop in map.statsData) {
        if (prop == 'diastolic')    {
            type='bar';
            backgroundColor = 'rgba(170,28,58,.8)';
            hoverBackgroundColor = diastolicColorsArr;
            borderWidth=0;
            yAxisID ='y-axis-1';
        }
        if (prop == 'systolic')     {
            type='bar';
            backgroundColor = 'rgba(204,39,62,.8)';
            hoverBackgroundColor = systolicColorsArr;
            borderWidth=0;
            yAxisID ='y-axis-1';
        }
        if (prop == 'heartrate')    {type='line';    backgroundColor = 'rgba(0,0,0,0)';     borderWidth = 2;    borderColor = 'rgba(256,0,0,1)';yAxisID ='y-axis-0';}
        if (prop == 'weight')       {type='line';    backgroundColor = 'rgba(0,0,0,0)';     borderWidth = 1;    borderColor = 'rgba(0,0,0,1)';yAxisID ='y-axis-1';}
        formattedData.statsData.datasets.push({
            backgroundColor, hoverBackgroundColor,
            type,
            borderColor, borderWidth,
            label: prop,
            pointHoverRadius, pointRadius,
            data: map.statsData[prop]
        })
    }

    delete formattedData.label;
    delete formattedData.datasets;

    return formattedData;
}