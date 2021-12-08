//how to read a large file from the filesystem and then send it to the client?

const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  //solution 1
  //   fs.readFile('test-file.txt', 'utf8', (err, data) => {
  //     if (err) console.log(err)
  //     res.end(data)
  //   })
  //with this solution node have to load all the file in the memory before
  //too slow!

  //solution 2
  //   const readable = fs.createReadStream('test-file.txt')
  //   readable.on('data', (chunk) => {
  //     res.write(chunk) //we read one piece and as soon its avaiable we send it to the client
  //   })
  //   readable.on('end', () => res.end()) //necessary to actually send the response to the client
  //   readable.on('error', (err) => console.log(err))
  //   res.statusCode = 500 //i force the server error
  //   res.end('file not found')
  //this is better, but our readable streams reads data much faster than we can send to the client, overwhelming the communication channel (backpressure problem)

  //solution  3
  const readable = fs.createReadStream('test-file.txt')
  readable.pipe(res) //solves the problem of 'backpressure'
})
////////////////////////////////////////////////////////////////
server.listen(8000, '127.0.0.1', () => {
  console.log('listening')
})
