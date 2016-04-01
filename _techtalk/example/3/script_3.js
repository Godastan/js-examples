/*
 * WORKER #2
 * **/
var result = document.querySelector('#result');
var worker = new SharedWorker('worker.js');

worker.port.addEventListener('message', function (e) {
    console.log(e);
    result.innerHTML += e.data + '<br>';
});

worker.port.start();