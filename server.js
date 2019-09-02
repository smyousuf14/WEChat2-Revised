var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var users = [];
var counter = 0;

app.get("/",function(req,res){

	res.sendFile(__dirname +  "/index.html");


});

io.on("connection", function(socket){
	
	//io.sockets.emit("connection", "a user has entered the chat"); 
	console.log("a user has connected");
	
	// If someone enters the chat
	socket.on("enters", function(msg){
		io.emit("enters", msg);
	});
	
	// Indicate how many users are in the chat.
	socket.on("how many", function(CurrentUser){
		// Increment the counter	
		counter++;
		console.log("" + counter);
		io.emit("how many", counter,CurrentUser);
	});
	
	
	socket.on("chat message", function(msg){
		io.emit("chat message", msg);
	});
	
	
	socket.on("disconnect", function(){
		counter--;
	    io.emit("disconnection", "a user has left the chat");
		console.log("A user has disconnected");
	});
});


http.listen(3000,function(){
	
	console.log("Listening at port 3000");
	
});