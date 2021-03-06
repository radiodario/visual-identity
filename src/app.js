var host = "radiodario.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";

var recorder = require('./audioRecorder');
// var polykit = require('./identikit');
var dat = require('dat.gui');

var startButton = document.querySelector('button#start');
var stopButton = document.querySelector('button#stop');

var cont = document.querySelector('div.polycontainer');

recorder.init();
recorder.start();

var timerDiv = document.querySelector('div.timer');

var interval;
var timeout;


var gui = new dat.GUI();
// Setup gui
gui.close();

gui.add(recorder.analyser, "minDecibels").min(-90).max(-11).step(1);
gui.add(recorder.analyser, "maxDecibels").min(-10).max(30).step(1);
gui.add(recorder.analyser, "smoothingTimeConstant").min(0.1).max(1).step(0.01);

gui.add(recorder.poly, "resetSettings").listen();

gui.add(recorder.poly, "angleSpeed").min(0).max(0.1).step(0.001).listen();
gui.add(recorder.poly, "bgAlpha").min(0).max(0.01).step(0.0001).listen();
gui.add(recorder.poly, "inkAlpha").min(0).max(0.1).step(0.0001).listen();
gui.add(recorder.poly, "hueSpeed").min(0).max(1).step(0.001).listen();
gui.add(recorder.poly, "hue").min(0).max(360).step(1).listen();

gui.add(recorder.poly, "castFrame").listen();
gui.add(recorder.poly, "fromSpectrum").listen();
gui.add(recorder.poly, "shrink").listen();

window.gui = gui;

cont.onclick = function (argument) {
    clearInterval(interval);
    clearTimeout(timeout);
    recorder.recording = true;
    // var idx = 5 + (Math.random() * 5 | 0);
    // var size = Math.pow(2, idx);
    // console.log(idx, size)
    // recorder.analyser.fftSize = size;
    recorder.poly.init();
    timeout = startTimer();
}

stopButton.onclick = function () {
    recorder.recording = false;
}


function startTimer() {
    var count = 10;
    timerDiv.innerHTML = --count;

    timerDiv.style.display = null;

    interval = setInterval(function() {
        timerDiv.innerHTML = --count;
    }, 1000);


    return setTimeout(function() {
        timerDiv.innerHTML = --count;
        recorder.recording = false;
        clearInterval(interval);
        timerDiv.style.display = 'none';
    }, 1000 * count);
}



