self.addEventListener('message', function(event) {

    var promise = self.clients.matchAll()
        .then(function(clientList) {
    
            var senderID = event.source ? event.source.id : 'unknown';
    
            clientList.forEach(function(client) {
    
                if (client.id === senderID) {
                    return;
                }
                client.postMessage({
                    client: senderID,
                    message: event.data
                });
            });
        });

    event.waitUntil(promise);
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});
