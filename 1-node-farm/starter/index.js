//i can require modules directly by name
//list of all nodejs modules avaiable: https://nodejs.org/docs/latest-v14.x/api/
const fs = require('fs'); //for intereacting with filesystem
const http = require('http'); //networking capabilities
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
////////////////////////////////////////////////////////////////

//READ AND WRITE FILES SYNCHRONOUSLY (BAD)
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')//read txt file
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.
// Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)//create new txt file

//both readFileSync and WriteFileSync are Synchronous methods, so executed one after the other, blocking successive code! If a lot of users are using you application at the same time this is a huuuuge problem!!! In other languages like PHP we have a new thread for each new user, with nodejs its always just one!!! This is why nodejs relies heavily on callback functions (asynchronous code)

//READ AND WRITE FIELS ASYNCHRONOUSLY (GOOD)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('.txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => { console.log('your file has been written'); })//solo err perchè non ottengo nessun data, sto scrivendo il file
//         })
//     })//i will exit this callback hell using async await
// })
// console.log('will read file!');//will output first! cause readFile is asynchronous

////////////////////////////////////////////////////////////////
//SERVER

//get all the data from files

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
//It's ok if its asynchronous, cause is top level code and only executed once
//The variable __dirname always contains location of the current file (instead, '.' is the location where the script is running)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); //array of 5 objects

//trying the slugify package
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

//create the server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(''); //replace the array with the html of the 5 cards
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }

  //Product page
  else if (pathname === '/product') {
    const product = dataObj[query.id];
    res.writeHead(200, { 'Content-type': 'text/html' });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //API page
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json ' });
    res.end(data);
  }

  //page not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    }); //output error 404 in the console
    res.end('<h1>page not found</h1>');
  }
});
//make the server listen to a port of an address
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
