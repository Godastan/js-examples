function quickSort(arr, start, end) {
    if (start < end) {
        var mid = partition(arr, start, end);
        quickSort(arr, start, mid - 1);
        quickSort(arr, mid + 1, end);
    }
}

function partition(arr, start, end) {
    var i = start - 1;
    for (var j = start; j < end; j++) {
        if (arr[j] <= arr[end]) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, end);
    return i + 1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function binSearch(arr, start, end, elem) {
    if (start === end) {
        return arr[start] !== undefined
            ? start
            : null
    }

    var mid = start + parseInt(Math.ceil(end - start + 1) / 2);

    if (elem > arr[mid - 1]) {
        return binSearch(arr, mid, end, elem);
    } else {
        return binSearch(arr, start, mid - 1, elem);
    }
}