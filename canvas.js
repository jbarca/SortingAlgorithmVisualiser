/*  Canvas to visualise the algorithms
    Author: Jacob Barca
    Since: 15/11/2019
    Last Modified: 16/11/2019
*/

import { selection_sort } from './algorithms';

/* Constants */
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

var array = [2, 45, 99, 6, 7, 100];
var MAX_ELEMENT_HEIGHT = MAX_HEIGHT / Math.max(...array); // ... is the 'spread' operator
console.log(MAX_ELEMENT_HEIGHT);

var canvas = document.getElementById("visualiser");

var ctx = canvas.getContext("2d");

ctx.fillStyle = "#FF0000";

for (var i = 0; i < array.length; i++) {
    ctx.fillRect(0 + 10 * i, MAX_HEIGHT - array[i] * MAX_ELEMENT_HEIGHT, 5, array[i] * MAX_ELEMENT_HEIGHT);
}

var newArray = selection_sort(array);

for (var i = 0; i < newArray.length; i++) {
    ctx.fillRect(0 + 10 * i, MAX_HEIGHT - newArray[i] * MAX_ELEMENT_HEIGHT, 5, newArray[i] * MAX_ELEMENT_HEIGHT);
}

