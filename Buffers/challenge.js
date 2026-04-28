// 0100 1000 0110 1001 0010 0001
// challenge is to write these binary data to the memory and use character encoding (utf-8) to print it out

const { Buffer } = require('buffer')

const memoryContainer = Buffer.alloc(3)
memoryContainer[0] = 0x48
memoryContainer[1] = 0x69
memoryContainer[2] = 0x21

console.log(memoryContainer)
console.log(memoryContainer.toString('utf-8'))

//this from method is kind of smart
const buff = Buffer.from([0x48, 0x69, 0x21])
console.log(buff.toString('utf-8'))

//alternatively,
const buff1 = Buffer.from("486921", "hex")
console.log(buff1.toString('utf-8'))

const buff2 = Buffer.from("Hi!", "utf-8")
console.log(buff2)