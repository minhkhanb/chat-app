var Express = require('express');
var app = new Express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 3000;

app.use(Express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  res.render('index');
});

// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  })

});

// Listen application request on port 3000
http.listen(port, function(){
  console.log('listening on *:3000');
});
