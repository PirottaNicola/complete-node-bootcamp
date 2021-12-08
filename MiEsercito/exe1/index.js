//importo moduli necessari
const url = require('url')
const http = require('http')
const fs = require('fs')

//!SYNCHRONOUSLY - cause executed once (not once per user!!!)
//leggo dati
const data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`))

//reperisco i templates
let index = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
const welcome = fs.readFileSync(`${__dirname}/templates/welcome.html`, 'utf8')

//!ASYNCHRONOUSLY - cause executed once per user!
//creazione server
const server = http.createServer((req, res) => {
  //get url of the current page
  const { pathname } = url.parse(req.url, true)
  console.log(pathname)

  //routing
  if (pathname === '/' || pathname === '/home') {
    //setto la head di risposta se richiesta va a buon fine
    res.writeHead(200, 'page found!', { 'Content-Type': 'text/html' })

    //sostituisco elementi in welcome.html
    const replaceTemplate = (temp, d) => {
      let output = temp.replace(/%NAME%/g, d.name)
      output = output.replace(/%SURNAME%/g, d.surname)

      return output
    }
    //sostituisco elementi in index.html con il template
    index = index.replace(/%CONTENUTO%/g, replaceTemplate(welcome, data))
    res.end(index)
  }
})

//espongo il server sulla porta di un indirizzo
server.listen(8000, '127.0.0.1', () =>
  console.log('listening to port 8000 on localhost')
)
