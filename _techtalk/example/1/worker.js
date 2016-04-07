importScripts('import.js');
console.log(importedSquare(4));

var queue = [];

self.addEventListener('message', function (e) {

    console.log(`Worker got a message: ${e.data.id}`);

    queue.push(e.data.id);
});

setInterval(function () {
    if (queue.length === 0) {
        console.log('queue is empty');
        return;
    }

    let id = queue.shift();
    console.log(`shifting: ${id}`);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:9000', false);
    xhr.onload = onload(id);
    xhr.onerror = onerror(id);
    xhr.send();
}, 100);

function onerror(id) {
    return function () {
        console.log(`Worker sent an error: ${id}`);
        self.postMessage({
            id: id,
            text: `${this.status} : ${this.statusText}`
        });
    }
}

function onload(id) {
    return function () {
        console.log(`Worker sent a message: ${id}`);
        self.postMessage({
            id: id,
            text: this.responseText
        });
    }
}
