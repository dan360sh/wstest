var socket = new WebSocket("ws://localhost:2400");
socket.onmessage = function(event){
	var data = JSON.parse(event.data);
    event.emit(data.type,data.content);
}
function send(e){
     socket.send(JSON.stringify(e));

}