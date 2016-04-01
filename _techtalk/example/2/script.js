var result = document.querySelector('#result');
var start_btn = document.querySelector('#start_btn');
var client_close_btn = document.querySelector('#client_close_btn');
var worker_close_btn = document.querySelector('#worker_close_btn');
var worker = new Worker('worker.js');
console.log(worker);

start_btn.onclick = function () {
    var o1 = {name: 'object_1'};
    var o2 = {name: 'object_2'};
    o1.nested = o2;
    o2.nested = o1;
    worker.postMessage({
        action: 'start',
        objects: [o1, o2]
    });
};

client_close_btn.onclick = function () {
    console.log('terminate');
    worker.terminate();
};

worker_close_btn.onclick = function () {
    worker.postMessage({
        action: 'stop'
    })
};

worker.onmessage = function (e) {
    result.innerText += e.data + ',';
};
