onmessage = function (e) {
    console.log('Worker got a message:');
    console.log(e.data);

    if(e.data.action === 'stop'){
        console.log('closing');
        close();
    }

    setInterval(function () {
        var data = Math.round(Math.random() * 100);
        console.log('Worker sent a message:');
        console.log('wr ' + data);
        postMessage(data);
    }, 2500);
};
