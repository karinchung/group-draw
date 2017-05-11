const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const PORT = 3000

var app = express()
var httpServer = http.Server(app)
var wsServer = socketIO(httpServer)

app.get('/', function(req, res) {
  res.sendFile('index.html', {root:__dirname})
})

wsServer.on('connection', function(socket) {
  console.log('a user connected!')
  socket.on('dragged', function(d) {
    // console.log('someone is painting', d)
    wsServer.emit('global-drag', d)
  })
})

httpServer.listen(PORT, function() {
  console.log('🤘 http server started on port: ', PORT)
})
