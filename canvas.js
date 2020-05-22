/*  Canvas to visualise the algorithms
    Author: Jacob Barca
    Since: 15/11/2019
    Last Modified: 21/5/2020
*/

import { getAlgorithm } from './algorithms.js';

/* Constants */
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;
var sortingSpeed = 1000; // ms - minimum time is 4ms for setTimeout
var array = [];
var rects = [];
var canvas = null;
var ctx = null;
var MAX_ELEMENT_HEIGHT;
var Colour = {RED: "#FF0000", GREEN: "#00FF00", BLUE: "#0000FF"};

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
    clearScreen();
    for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor((Math.random() * 100) + 1);
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
    createArray(MAX_WIDTH / 10);
    rects = createRectangles();
    drawRectangles();
}

function createArray(n) {
    for (var i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    MAX_ELEMENT_HEIGHT = MAX_HEIGHT / Math.max(...array);
}

function createRectangles() {
    var rectangles = [];
    for (var i = 0; i < array.length; i++) {
        rectangles.push(new Rectangle(10 * i, MAX_HEIGHT - array[i] * MAX_ELEMENT_HEIGHT, 5, array[i] * MAX_ELEMENT_HEIGHT, Colour.RED, ctx));
    }
    return rectangles;
}

function drawRectangles() {
    for (var i = 0; i < rects.length; i++) {
        rects[i].draw();
    }
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /*
    for (var i = 0; i < rects.length; i++) {
        rects[i].clear();
    }
    */
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
    clearScreen();
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
            changeColour(j, Colour.GREEN) 
            await sleep(sortingSpeed);
            if (array[j] < array[min_index]) {
                changeColour(min_index, Colour.RED)
                changeColour(j, Colour.BLUE) 
                await sleep(sortingSpeed);
                min_index = j;
            }
            else {
                changeColour(j, Colour.RED) 
            }
        }
        changeColour(min_index, Colour.RED);
        swap(array, i, min_index);
        
        clearScreen();
        swapRectangles(rects, i, min_index);
        drawRectangles();
        await sleep(sortingSpeed);
    }
}

async function insertion_sort() {
    var j;
    var temp;
    for (var i = 0; i < array.length; i++) {
        j = i;
        changeColour(i, Colour.GREEN);
        await sleep(sortingSpeed);
        while (j > 0 && array[j] < array[j - 1]) {
            changeColour(j, Colour.BLUE);
            await sleep(sortingSpeed);
            temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            swapRectangles(rects, j, j - 1);
            j--;
        }
        changeColour(j, Colour.RED);
        changeColour(i, Colour.RED);
    }
}

async function bubble_sort() {
    var mark = array.length - 1;
    var temp;
    var swapped = false;
    for (var i = mark; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            swapped = false;
            changeColour(j, Colour.GREEN);
            if (array[j] > array[j + 1]) {
                changeColour(j, Colour.BLUE);
                await sleep(sortingSpeed);
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
                swapRectangles(rects, j, j + 1);
            }
            if (!swapped) {
                await sleep(sortingSpeed);
            }
            changeColour(j, Colour.RED);
        }
        changeColour(i, Colour.RED);
    }
}

// TODO: Fix rectangle animation for quick sort.
async function quick_sort_iterative(start, end) {
    var stack = new Array(end - start + 1);
    var top = -1;

    top++;
    stack[top] = start;
    top++;
    stack[top] = end;

    while (top >= 0) {
        end = stack[top];
        top--;
        start = stack[top];
        top--;

        var pivot = array[end]
        var bound = start - 1;
        var temp;
        for (var i = start; i <= end; i++) {
            changeColour(i, Colour.GREEN);
            await sleep(sortingSpeed);
            if (array[i] < pivot) {
                changeColour(i, Colour.BLUE);
                await sleep(sortingSpeed);
                bound++;
                temp = array[i];
                array[i] = array[bound];
                array[bound] = temp;
                swapRectangles(rects, i, bound);
                changeColour(bound, Colour.RED);
                changeColour(i, Colour.RED);
            }
        }

        changeColour(end, Colour.BLUE);
        await sleep(sortingSpeed);
        temp = array[end];
        array[end] = array[bound + 1];
        array[bound + 1] = temp;
        swapRectangles(rects, end, bound + 1);
        changeColour(bound + 1, Colour.RED);

        var p = bound + 1;

        if (p - 1 > start) {
            top++;
            stack[top] = start;
            top++;
            stack[top] = p - 1;
        }
        if (p + 1 < end) {
            top++;
            stack[top] = p + 1;
            top++;
            stack[top] = end;
        }
    }
    console.log(array);
}

// TODO: Fix recursion with async functions
function quick_sort() {
    quick_sort_iterative(0, array.length - 1);
}

async function quick_sort_aux(start, end) {
    if (start < end) {
        var bound = partition(start, end);
        await quick_sort_aux(start, bound - 1);
        await quick_sort_aux(bound + 1, end);
    }
}

function partition(start, end) {
    var pivot = array[end]
    var bound = start - 1;
    var temp;
    for (var i = start; i <= end; i++) {
        if (array[i] < pivot) {
            bound++;
            temp = array[i];
            array[i] = array[bound];
            array[bound] = temp;
        }
    }

    temp = array[end];
    array[end] = array[bound + 1];
    array[bound + 1] = temp;

    return bound + 1;

}
