/*
 * WORKER #2
 * **/
var result = document.querySelector('#result');
var btn = document.querySelector('#btn');
var parentWorker = parent.worker;

btn.addEventListener('click', function () {
    console.log('page 2 sent a msg');
    parentWorker.port.postMessage('Request_2');
});

parentWorker.port.addEventListener('message', function (e) {
    console.log(e);
    result.innerHTML += e.data + '<br>';
});
parentWorker.port.start();