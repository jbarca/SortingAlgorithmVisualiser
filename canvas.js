/*  Canvas to visualise the algorithms
    Author: Jacob Barca
    Since: 15/11/2019
    Last Modified: 17/11/2019
*/

import { getAlgorithm, selectAlgorithm } from './algorithms.js';

/* Constants */
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;
var array = [1, 2, 3, 4, 5];
var rects = [];
var canvas = null;
var ctx = null;
var MAX_ELEMENT_HEIGHT = MAX_HEIGHT / Math.max(...array);

var sortButton = document.getElementById("sort");
var newArrayButton = document.getElementById("new");

sortButton.onclick = function() {
    animateSorting();
}

newArrayButton.onclick = function() {
    clearRectangles();
    for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor((Math.random() * 10) + 1);
    }
    rects = createRectangles();
    drawRectangles();
}

window.onload = function() {
    init();
}

class Rectangle {
    /*  This class will be used to keep track of the rectangles
        representing the different elements in the array */
    constructor(x, y, width, height, colour, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.colour;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    clear() {
        this.context.clearRect(this.x, this.y, this.width, this.height);
    }

    setColour(newColour) {
        this.colour = newColour;
    }
}

/* Init */
function init() {
    canvas = document.getElementById("visualiser");
    canvas.width = MAX_WIDTH;
    canvas.height = MAX_HEIGHT;
    ctx = canvas.getContext("2d");
    rects = createRectangles();
    drawRectangles(rects);
}

function createRectangles() {
    var rectangles = [];
    for (var i = 0; i < array.length; i++) {
        rectangles.push(new Rectangle(10 * i, MAX_HEIGHT - array[i] * MAX_ELEMENT_HEIGHT, 5, array[i] * MAX_ELEMENT_HEIGHT, "#FF0000", ctx));
    }
    return rectangles;
}

function drawRectangles() {
    for (var i = 0; i < rects.length; i++) {
        rects[i].draw();
    }
}

function clearRectangles() {
    for (var i = 0; i < rects.length; i++) {
        rects[i].clear();
    }
}