'use strict';

var width = 256;
var height = 256;
var buffers = [ new Uint8Array(width * height),
                new Uint8Array(width * height) ];

function initWithRandomNoise(array) {
    for (var i = 0, n = array.length; i !== n; ++i) {
        array[i] = (Math.random() < 0.30) ? 0 : 1;
    }
}
function initWith1s(array) {
    for (var i = 0, n = array.length; i !== n; ++i) {
        array[i] = 1 ^ (i % 2);
    }
}
initWithRandomNoise(buffers[0]);
initWithRandomNoise(buffers[1]);

var theCanvas = document.querySelector('#theCanvas');
theCanvas.width = width * 2; // 2 pixels per cell
theCanvas.height = height * 2;
var theSlider = document.querySelector('#theSlider');
var theOtherSlider = document.querySelector('#theOtherSlider');
var startSimulationButton = document.querySelector('#startSimulation');
var randomizeButton = document.querySelector('#randomize');

function randInt(low, high) {
    var diff = high - low;
    if (diff < 0) { throw new Error('Invalid range.'); }
    return low + Math.floor(Math.random() * diff)
}

theSlider.addEventListener('change', drawARectangle);
theOtherSlider.addEventListener('change', drawARectangle);

function randColor() {
    function rand() {
        return randInt(0, 16).toString(16);
    }
    return '#' + rand() + rand() + rand();
}

function drawARectangle() {
    var n = parseInt(theSlider.value, 10);
    var otherN = parseInt(theOtherSlider.value, 10);
    var ctx = theCanvas.getContext('2d');
    ctx.fillStyle = randColor();
    ctx.fillRect(n, otherN, 64, 64);
    for (var i = 0; i !== 512 / 32; ++i) {
        for (var j = 0; j !== 512 / 32; ++j) {
            ctx.fillStyle = randColor();
            ctx.fillRect(i * 32, j * 32, 32, 32);
        }
    }
}

function swapBuffers() {
    var tmp = buffers[0];
    buffers[0] = buffers[1];
    buffers[1] = tmp;
}

var currentBuffer = 0;

function drawLifeFromBuffer(ctx) {
    var which = currentBuffer % 2;
    var other = which ^ 1;
    currentBuffer += 1;
    var array = buffers[which];
    var whichBuf = buffers[which];
    var otherBuf = buffers[other];

    //for (var i = 0; i !== width; ++i) {
    //    for (var j = 0; j !== height; ++j) {
    //        otherBuf[i * width + ((j + 1) % height)] ^= whichBuf[i * width + j];
    //    }
    //}
    updateLife(buffers[which], buffers[other]);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.fillStyle = '#000';
    for (var i = 0; i !== width; ++i) {
        for (var j = 0; j !== height; ++j) {
            var val = array[i * width + j];
            if (val !== 1) { continue; }
            ctx.fillRect(i * 2, j * 2, 2, 2);
        }
    }
}

function index(buffer, width, height, ii, jj) {
    ii = (ii + width) % width;
    jj = (jj + height) % height;
    return buffer[ii * width + jj];
}

function countLiveNeighbors(buffer, width, height, i, j) {
    var liveNeighbors = 0;
    // We assume that the buffers hold either 0 or 1.
    // 0 => dead
    // 1 => alive
    liveNeighbors += index(buffer, width, height, i + 1, j);
    liveNeighbors += index(buffer, width, height, i - 1, j);
    liveNeighbors += index(buffer, width, height, i, j + 1);
    liveNeighbors += index(buffer, width, height, i, j - 1);
    liveNeighbors += index(buffer, width, height, i + 1, j + 1);
    liveNeighbors += index(buffer, width, height, i + 1, j - 1);
    liveNeighbors += index(buffer, width, height, i - 1, j - 1);
    liveNeighbors += index(buffer, width, height, i - 1, j + 1);
    return liveNeighbors;
}

function shouldLive(buffer, width, height, i, j) {
    var liveNeighbors = countLiveNeighbors(buffer, width, height, i, j);
    if (index(buffer, width, height, i, j)) { // Is this cell alive?
        return (liveNeighbors === 2 || liveNeighbors === 3 || liveNeighbors === 6) ? 1 : 0;
    } else {
        return (liveNeighbors === 3) ? 1 : 0;
    }
}

// FIXME: encapsulate the buffer into something that will know its width and
// height.
function updateLife(newGen, oldGen) {
    for (var i = 0; i !== width; ++i) {
        for (var j = 0; j !== height; ++j) {
            newGen[i * width + j] = shouldLive(oldGen, width, height, i, j);
        }
    }
}

var active = false;
startSimulationButton.addEventListener('click', function (e) {
    if (active) { return; }
    active = true;
    var reqAnimFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame);
    reqAnimFrame(function again() {
        drawLifeFromBuffer(theCanvas.getContext('2d'));
        reqAnimFrame(again);
    });
});

randomizeButton.addEventListener('click', function (e) {
    initWithRandomNoise(buffers[0]);
    initWithRandomNoise(buffers[1]);
});
