var result = document.querySelector('#result');
var btn = document.querySelector('#btn');
var worker = new Worker('worker.js');

btn.onclick = function () {
    worker.postMessage({
        prop: 'some test data'
    });
};

worker.onmessage = function (e) {
    result.innerText = e.data;
};
