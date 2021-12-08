console.log(arguments)
console.log('--------------------------------')
console.log(require('module').wrapper)

//module.exports
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2, 5))

//exports
// const calc2 = require('./test-module-2')
const { add, multiply, divide } = require('./test-module-2')
console.log(multiply(3, 5))

//caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()
//"hello from the mofule" is displayed once cause the module is executed only the first time, then its cached
