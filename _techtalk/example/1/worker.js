let queue = [];
self.addEventListener('message', function (e) {

    console.log('Worker got a message: ' + e.data.id);

    queue.push(e.data.id);

    setInterval(function () {
        if(queue.length === 0){
            console.log('queue is empty');
            return;
        }

        let id = queue.shift();
        console.log('shifting: ' + id);


        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:9000', true);

        xhr.onload = function () {
            console.log(`Worker sent a message: ${id}`);
            self.postMessage({
                id: id,
                text: this.responseText
            });
        };

        xhr.onerror = function(){
            console.log(`Worker sent an error: ${id}`);
            self.postMessage({
                id: id,
                text: `${this.status} : ${this.statusText}`
            });
        };

        xhr.send();
    }, 100);
});


