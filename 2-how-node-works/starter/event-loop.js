const fs = require('fs')
const crypto = require('crypto') //all functions of this package will automatically be offloaded to the thread pool

const start = Date.now()

//i can set the number of thread of the thread pool(default 4)
process.env.UV_THREADPOOL_SIZE = 4

//! PRIORITIES OF THE EVENT LOOP

fs.readFile('./test-file.txt', () => {
  console.log('I/O finished')

  setTimeout(() => {
    console.log('timer1  finished')
  }, 0)
  setTimeout(() => {
    console.log('timer2  finished')
  }, 2000)
  setTimeout(() => {
    console.log('timer3  finished')
  }, 3000)

  setImmediate(() => {
    console.log('Immediate1 finished')
  })

  process.nextTick(() => {
    console.log('process.nextTick finished')
  })

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'password encrypted')
  )
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'password encrypted')
  )
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'password encrypted')
  )
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'password encrypted')
  )
})

console.log('hello from the top-level code') //#1

//TOP-LEVEL CODE >> PROCESS.NEXTTICK >> I/O CALLBACKS >> SETIMMEDIATE CALLBACKS >> CALLBACKS
