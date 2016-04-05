let worker = new Worker('worker.js');
let btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    let blocks = document.querySelectorAll('div:not(.loading)');
    for(let i = 0; i < blocks.length; i++){
        blocks[i].dispatchEvent(new Event('click'));
    }
});

worker.addEventListener('message', function (e) {
    let block = document.getElementById(e.data.id);
    block.classList.remove('loading');
    block.textContent = e.data.text;
});

for(let i = 0; i < 50; i++) {
    let block = document.createElement('div');
    block.classList.add('block');
    block.id = `block_${i}`;
    block.addEventListener('click', divClickListener);
    document.body.appendChild(block);
}

function divClickListener(evt){
    let block = evt.target;
    let message = {
        id: evt.target.id
    };
    worker.postMessage(message);
    block.textContent = '';
    if(!block.classList.contains('loading')){
        block.classList.add('loading');
    }
}
