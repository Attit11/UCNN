const { Buffer } = require('buffer')


// first element of the alloc method is the size 
// second element of the alloc method is used to fill the buffer elements
// if nothing is specified in the second argument it by default assigns 0 to all the elements
// but if something is specified then all the elements is filled in with the same value
const buffer = Buffer.alloc(100000, 'a')

//there is another way of doing it as it does not 0 out all the buffer elements
//there could be some value in the memory that is being assigned with this allocUnsafe method
//this is not a good way to assign the buffer this way  
const bufferUnsafe = Buffer.allocUnsafe(100000)

// for (let i = 0; i < bufferUnsafe.length; i++) {
//     if (bufferUnsafe[i] !== 0) {
//         console.log(`Elements at position ${i} has value: ${bufferUnsafe[i].toString(2)}`)
//     }
// }

for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] !== 0) {
        console.log(`Elements at position ${i} has value: ${buffer[i].toString(2)}`)
    }
}