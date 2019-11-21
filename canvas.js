/*  Canvas to visualise the algorithms
    Author: Jacob Barca
    Since: 15/11/2019
    Last Modified: 20/11/2019
*/

import { getAlgorithm } from './algorithms.js';

/* Constants */
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;
var sortingSpeed = 1000; // ms
var array = [1, 2, 3, 4, 5];
var rects = [];
var canvas = null;
var ctx = null;
var MAX_ELEMENT_HEIGHT = MAX_HEIGHT / Math.max(...array);

var sortButton = document.getElementById("sort");
var newArrayButton = document.getElementById("new");

function sleep(ms) {
    /* Function to allow the program to be delayed for a 
    certain amount of time */
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.onclick = function() {
    animateSorting();
}

newArrayButton.onclick = function() {
    clearRectangles();
    for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor((Math.random() * 10) + 1);
    }
    MAX_ELEMENT_HEIGHT = MAX_HEIGHT / Math.max(...array);
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

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setWidth(newWidth) {
        this.width = newWidth;
    }

    setHeight(newHeight) {
        this.height = newHeight;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    
}

/* Init */
function init() {
    canvas = document.getElementById("visualiser");
    canvas.width = MAX_WIDTH;
    canvas.height = MAX_HEIGHT;
    ctx = canvas.getContext("2d");
    rects = createRectangles();
    drawRectangles();
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

function animateSorting() {
    var alg = getAlgorithm('algorithms');
    switch (alg) {
        case "selection_sort":
            selection_sort();
            break;
        case "insertion_sort":
            insertion_sort();
            break;
        case "bubble_sort":
            bubble_sort();
            break;
        case "quick_sort":
            quick_sort();
            break;
        default:
            throw "Incorrect sorting algorithm name.";
    }
}

function changeColour(index, colour) {
    clearRectangles();
    rects[index].setColour(colour);
    drawRectangles();
}

function swap(_array, i, j) {
    var tmp = _array[i];
    _array[i] = _array[j];
    _array[j] = tmp;
}

function swapRectangles(_array, i, j) {
    var tmpX = _array[i].getX();
    _array[i].setX(_array[j].getX());
    _array[j].setX(tmpX);
    swap(rects, i, j);
}

async function selection_sort() {
    var min_index = 0;
    for (var i = 0; i < array.length; i++) {
        min_index = i;
        for (var j = i + 1; j < array.length; j++) {
            changeColour(j, "#00FF00") // green
            await sleep(sortingSpeed);
            if (array[j] < array[min_index]) {
                changeColour(j, "#0000FF") // blue
                await sleep(sortingSpeed);
                min_index = j;
            }
            else {
                changeColour(j, "#FF0000") // red
            }
        }
        changeColour(min_index, "#FF0000");
        swap(array, i, min_index);
        
        clearRectangles();
        swapRectangles(rects, i, min_index);
        drawRectangles();
        await sleep(sortingSpeed);
    }
}