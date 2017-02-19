var Rainbow = require('rainbowvis.js');

var diasRainbow = new Rainbow();
diasRainbow.setSpectrum('E1E1E1','E1E1E1','E1E1E1','E1E1E1','lightblue',
                        'lightgreen', 'lightgreen', 'lightgreen',
                        'fedd44',
                        'red');
diasRainbow.setNumberRange(0, 100);

var saltRainbow = new Rainbow();
saltRainbow.setSpectrum('#E1E1E1', 'green', 'green', 'green', 'fedd44', 'fedd44', 'red');
saltRainbow.setNumberRange(0, 2000);

var sysRainbow = new Rainbow();
sysRainbow.setSpectrum('#E1E1E1', '#E1E1E1','#E1E1E1','#E1E1E1','#E1E1E1','#E1E1E1','lightblue','lightblue',
                        'lightgreen','lightgreen', 'lightgreen',
                        'fedd44', 'fedd44',
                        'orange','orange', 'orange',
                        'red');
sysRainbow.setNumberRange(0, 180);

var waterRainbow = new Rainbow();
waterRainbow.setSpectrum('#E1E1E1', 'green', 'green', 'green', 'fedd44', 'fedd44', 'red');
waterRainbow.setNumberRange(0, 64);

export function calcDiastolicColor(num=0){
    return '#' + diasRainbow.colourAt(num);
}

export function calcSaltColor(num){
    return '#' + saltRainbow.colourAt(num);
}

export function calcSystolicColor(num=0){
    return '#' + sysRainbow.colourAt(num);
}

export function calcWaterColor(num){
    return '#' + waterRainbow.colourAt(num);
}