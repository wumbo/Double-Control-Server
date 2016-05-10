var socket = io(':3000');

socket.on('connect', function() {
    socket.emit('info', {'serial': '24'});
    console.log('Sending info: ', {'serial': '24'});
});
