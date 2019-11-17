/*  Implementation of sorting algorithms 
    Author: Jacob Barca
    Since: 14/11/2019
    Last Modified: 17/11/2019
*/

function getAlgorithm(dropDownName) {
    /* Returns the value of the "id" of the algorithm */
    var e = document.getElementById(dropDownName);
    return e.value;
}

function selectAlgorithm(algorithm, array) {
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

/* Not for use, just for knowledge */

function selection_sort(array) {
    /* Selection sort implementation: worst case O(n^2) */
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

    return newArray;
}

function insertion_sort(array) {
    /* Insertion sort implementation: worst case O(n^2) */
    var newArray = array.slice();
    var j;
    var temp;
    for (var i = 0; i < newArray.length; i++) {
        j = i;
        while (j > 0 && newArray[j] < newArray[j - 1]) {
            temp = newArray[j];
            newArray[j] = newArray[j - 1];
            newArray[j - 1] = temp;
            j--;
        }
    }

    return newArray;
}

function bubble_sort(array) {
    /* Bubble sort implementation: worst case O(n^2) */
    var newArray = array.slice();

    var mark = newArray.length - 1;
    var temp;
    for (var i = mark; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (newArray[j] > newArray[j + 1]) {
                temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
            }
        }
    }

    return newArray;
}

function quick_sort(array) {
    /* Quick sort implementation: worst case O(n^2) */
    var newArray = array.slice();
    quick_sort_aux(newArray, 0, newArray.length - 1);
    return newArray;
}

function quick_sort_aux(array, start, end) {
    /* Quick sort helper method: recursively sorts sub-lists */
    if (start < end) {
        var bound = partition(array, start, end);
        quick_sort_aux(array, start, bound - 1);
        quick_sort_aux(array, bound + 1, end);
    }
}

function partition(lst, start, end) {
    /* Helper method to partition sub-lists */
    var pivot = lst[end]
    bound = start - 1;
    var temp;
    for (var i = start; i <= end; i++) {
        if (lst[i] < pivot) {
            bound++;
            temp = lst[i];
            lst[i] = lst[bound];
            lst[bound] = temp;
        }
    }

    temp = lst[end];
    lst[end] = lst[bound + 1];
    lst[bound + 1] = temp;

    return bound + 1;

}

export { getAlgorithm, selectAlgorithm };





