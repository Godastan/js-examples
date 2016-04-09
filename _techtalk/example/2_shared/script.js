/*
 * WORKER #1
 *
 */

var result = document.getElementById('result');

var worker = new SharedWorker('shared_worker.js');
console.log(worker);
worker.port.addEventListener('message', function (e) {
    console.log(e);
    result.innerHTML += e.data + '<br>';
});
worker.port.start();

var btn = document.querySelector('#btn');
btn.addEventListener('click', function () {
    console.log('page 1 sent a msg');
    worker.port.postMessage('request_1');
});
