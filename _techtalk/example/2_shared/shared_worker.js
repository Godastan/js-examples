var connectionsCount = 0;

self.addEventListener('connect', function (e) {
    var port = e.ports[0];
    connectionsCount++;
    port.postMessage(`Connection number: ${connectionsCount}`);

    port.addEventListener('message', function (e) {
        port.postMessage(`connections: ${connectionsCount} | data : ${e.data}`);
    });

    port.start();
});
