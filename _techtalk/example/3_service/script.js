var message = document.getElementById('message');
var received = document.getElementById('received');
var inbox = {};

navigator.serviceWorker.register('service_worker.js');

navigator.serviceWorker.addEventListener('message', function(event) {

    var clientId = event.data.client;
    var node;

    if (!inbox[clientId]) {
        node = document.createElement('div');
        received.appendChild(node);
        inbox[clientId] = node;
    }

    node = inbox[clientId];
    node.textContent = `Client ${clientId} says: ${event.data.message}`;
});

message.addEventListener('input', function() {
    navigator.serviceWorker.controller.postMessage(message.value);
});
