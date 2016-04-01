/*
 * WORKER #1
 * **/
var result = document.querySelector('#result');
var btn = document.querySelector('#btn');
var worker = new SharedWorker('worker.js');
console.log(worker);

btn.addEventListener('click', function () {
    console.log('page 1 sent a msg');
    worker.port.postMessage('request_1');
});

worker.port.addEventListener('message', function (e) {
    console.log(e);
    result.innerHTML += e.data + '<br>';
});

worker.port.start();
