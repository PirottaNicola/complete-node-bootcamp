const eventEmitter = require('events')
const http = require('http')

//*LISTEN TO CUSTOM EVENTS
//create an instance of the class
//const myEmitter = new eventEmitter() (better to extend the class)
class Sales extends eventEmitter {
  constructor() {
    super()
  }
}
const myEmitter = new Sales()

//set up listeners for the event named 'newSale'
myEmitter.on('newSale', () => console.log('there was a new sale'))
myEmitter.on('newSale', () => console.log('costumer name: Jona s'))
myEmitter.on('newSale', (stock) =>
  console.log(`there are now ${stock} items left in stock`)
)
//emits an event called newSale
myEmitter.emit('newSale', 9)

////////////////////////////////////////////////////////////////////////
//*LISTEN TO STANDARD EVENTS
const server = http.createServer()
server.on('request', (req, res) => {
  console.log('request received')
  console.log(req.url)
  res.end('request received')
})
server.on('request', (req, res) => {
  console.log('another request')
})
server.on('close', (req, res) => {
  console.log('server closed')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for request...')
  console.log(server.eventNames()) //list of the names of the events that can be emitted by the server
})
//in this case i am not listening to a custom event, but one emitted by the package http
