var connectionsCount = 0;
var allPorts = {};
self.addEventListener('connect', function (e) {
    var port = e.ports[0];
    connectionsCount++;
    allPorts[connectionsCount] = port;

    port.postMessage({
        type: 'connection',
        connection_id: connectionsCount
    });

    port.addEventListener('message', function (e) {
        switch (e.data.type){
            case 'message':
                allPorts[e.data.receiver].postMessage({
                    type: 'message',
                    message: e.data.message,
                    sender: e.data.sender
                });
                break;
            default:
                break;
        }
    });

    port.start();
});
