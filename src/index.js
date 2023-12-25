const express = require('express');
const SocketServer = require('ws').Server
const PORT = 3000;

const server = express().listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

const wss = new SocketServer({ server  })

wss.on('connection', (ws, req) => {
    console.log('Client connected')
    console.log(`Request URL: ${req.url}`) 
    console.log(`Request cookie: ${req.headers.cookie}`)
    ws.on('message', data => {
      data = data.toString()  
      console.log(data) 
      console.log(ws) 
  
      ws.send(data)
  
      let clients = wss.clients  
      clients.forEach(client => {
          client.send(data) 
      })
    })
   
    ws.on('close', () => {
      console.log('Close connected')
    })
  })