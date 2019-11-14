/*  Implementation of sorting algorithms 
    Author: Jacob Barca
    Since: 14/11/2019
    Last Modified: 14/11/2019
*/

// Global array for now, change later
var array = [8, 7, 9, 10, 2, 5, 1];

function getAlgorithm(dropDownName) {
    /* Returns the value of the "id" of the algorithm */
    var e = document.getElementById(dropDownName);
    return e.value;
}

function selectAlgorithm(algorithm) {
    /* Selects the correct algorithm based on user's selection */
    switch (algorithm) {
        case "selection_sort":
            selection_sort(array);
            break;
        case "insertion_sort":
            insertion_sort(array);
            break;
        case "bubble_sort":
            bubble_sort(array);
            break;
        case "quick_sort":
            quick_sort(array);
            break;
        default:
            throw "Incorrect sorting algorithm name.";
    }
}

function selection_sort(array) {
    var newArray = array.slice();

    var min_index = 0;
    var temp;
    for (var i = 0; i < newArray.length; i++) {
        min_index = i;
        for (var j = i + 1; j < newArray.length; j++) {
            if (newArray[j] < newArray[min_index]) {
                min_index = j;
            }
        }
        temp = newArray[i];
        newArray[i] = newArray[min_index];
        newArray[min_index] = temp;
    }
}





