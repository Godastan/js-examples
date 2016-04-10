var result = document.getElementById('result');
var connectionId;

var worker = new SharedWorker('shared_worker.js');
worker.port.addEventListener('message', function (e) {
    switch (e.data.type){
        case 'connection':
            connectionId = e.data.connection_id;
            result.innerHTML += `Connection ID: ${connectionId}<br>`;
            break;
        case 'message':
            result.innerHTML += `Message from ${e.data.sender}: ${e.data.message}<br>`;
            break;
        default:
            break;
    }
});
worker.port.start();

var btn = document.querySelector('#btn');
btn.addEventListener('click', function () {
    let receiverId = document.getElementById('receiver').value;
    let messageText = document.getElementById('message').value;
    let message = {
        type: 'message',
        sender: connectionId,
        receiver: receiverId,
        message: messageText
    };
    result.innerHTML += `Message to ${message.receiver}: ${message.message}<br>`;
    worker.port.postMessage(message);
});

var closeBtn = document.getElementById('close_btn');
closeBtn.addEventListener('click', function () {
   worker.terminate();
});
