$(function(){

var socket = io(':8443');

socket.on('connect', function() {
    console.log('Connected to socket');
    socket.emit('send doubles');
});

socket.on('doubles', function(doubles) {
	$("#double-select").html("");
	doubles.forEach(function(double) {
		$("#double-select").append('<option value="' + double + '">' + double + '</option>');
	});
	
	if (doubles.length > 0) {
		$("#controls").show();
	} else {
		$("#controls").hide();
	}
});

$("#up").mousedown(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), forward: 'start'});
});

$("#up").mouseup(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), forward: 'stop'});
});

$("#down").mousedown(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), backward: 'start'});
});

$("#down").mouseup(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), backward: 'stop'});
});

$("#left").mousedown(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), left: 'start'});
});

$("#left").mouseup(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), left: 'stop'});
});

$("#right").mousedown(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), right: 'start'});
});

$("#right").mouseup(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), right: 'stop'});
});

$("#deploy").click(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), kickstand: 'deploy'});
});

$("#retract").click(function(){
	socket.emit('control', {serial: $("#double-select").find(":selected").text(), kickstand: 'retract'});
});

});
