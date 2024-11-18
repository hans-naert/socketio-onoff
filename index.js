var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(516, 'out'); //use GPIO pin 4, and specify that it is output
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('set_output4', msg => {
      if(msg=='0')
      {
        console.log('set_output4 0')  
        LED.writeSync(0)
      }
      else
      {
        console.log('set_output4 1')  
        LED.writeSync(1)  
      }
  });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
