
var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);

var usocket = []; //全局变量

io.on('connection', function(socket){
    console.log('a user connected');

    io.emit("yoho","gaga");

    //监听join事件
    socket.on("join", function (name) {
        usocket[name] = socket
        socket.name = name;
        io.emit("join", name) //服务器通过广播将新用户发送给全体群聊成员
    })

    socket.on("message", function (msg) {
        io.emit("message", socket.name + ": " + msg) //将新消息广播出去
    })
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//启动监听，监听3000端口
http.listen(3000, function(){
  console.log('listening on *:3000');
});

