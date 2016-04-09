var worker = new Worker('worker.js');

worker.addEventListener('message', function (e) {
    console.log('Message FROM worker: ', e.data);
    let block = document.getElementById(e.data.id);
    block.classList.remove('loading');
    block.textContent = e.data.text;
});


var stopBtn = document.getElementById('stop_btn');
stopBtn.addEventListener('click', function () {
    worker.terminate();
});


var checkAllBtn = document.getElementById('check_all_btn');
checkAllBtn.addEventListener('click', function () {
    let blocks = document.querySelectorAll('div:not(.loading)');
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].dispatchEvent(new Event('click'));
    }
});

for (let i = 0; i < 50; i++) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.id = `block_${i}`;
    block.addEventListener('click', divClickListener);
    document.body.appendChild(block);
}

function divClickListener(evt) {
    let block = evt.target;
    let message = {
        id: evt.target.id
    };
    console.log('sending msg to worker: ', evt.target.id);
    worker.postMessage(message);
    block.textContent = '';
    if (!block.classList.contains('loading')) {
        block.classList.add('loading');
    }
}
