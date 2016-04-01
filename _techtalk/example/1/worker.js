onmessage = function (e) {

    console.log('Worker got a message:');
    console.log(e.data);
    var rand = Math.random() * 10000;

    setTimeout(function () {
        console.log('Worker sent a message:');
        console.log('wr ' + rand);
        postMessage(rand);
    }, Math.round(rand));
};
