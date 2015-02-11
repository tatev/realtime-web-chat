var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port, '0.0.0.0'));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    console.log('server: connect to server', socket);
    socket.emit('message', { message: 'welcome to the chat' }, new Date());
    socket.broadcast.emit('message', { message: 'this message will go to all the sockets except the sender' }, new Date());
    socket.on('send', function (data) {
        io.sockets.emit('message', data, new Date());
    });
});