var connectionsCount = 0;

self.addEventListener('connect', function (e) {
    connectionsCount++;

    var port = e.ports[0];
    port.addEventListener('message', function (e) {
        port.postMessage('connections: ' + connectionsCount + ' | data : ' + e.data);
    });
    port.start();

});
