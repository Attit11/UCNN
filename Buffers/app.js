const { Buffer } = require("buffer");

//using alloc method we can allocate memory to our buffer
const memoryContainer = Buffer.alloc(4); //assigned 4 bytes (32 bits) of memory size to our buffer

//accessing the memory container
console.log("visualization of the buffer", memoryContainer); // prints Buffer <Buffer 00 00 00 00>
console.log("Accessing the first element of the buffer", memoryContainer[0]); //prints 0

//assigning the first elements of the buffer with hex decimal value
memoryContainer[0] = 0xf4;

// first element of the buffer is updated to 0xf4
console.log("First element of the buffer updated", memoryContainer);

// prints 244 as the hex decimal F4 is equivalent to 244 in decimal after hex to decimal conversion
console.log("Accessing first element of the buffer", memoryContainer[0]);

// assigning values to the other elements of the buffer
memoryContainer[1] = 0x34;
memoryContainer[2] = 0xb6;
memoryContainer[3] = 0xff;

//accessing values of different elements of the buffer
console.log("Accessing second element of the buffer", memoryContainer[1]);
console.log("Accessing third element of the buffer", memoryContainer[2]);
console.log("Accessing fourth element of the buffer", memoryContainer[3]);

//As the size of the buffer is 4 bytes, and each element is assigned to hold 1 byte of data.
//So, our buffer can hold numbers ranging from 0-255 in decimal in its memory.
//Because 1111 1111 is 0xff and its decimal equivalent is 255
//in each element of our buffer it can hold decimal value ranging from 0 - 255 by default.

// Now to assign negative values if we assign it directlt to the buffer element it will do the 2's complement and store it
// So there is another way to assign as well, i.e.

//first argument is the value and the second argument is the location of the element in the buffer
memoryContainer.writeInt8(-32, 2)
//accessing the buffer for the negative value

console.log("Accessing the buffer for the negative value", memoryContainer.readInt8(2)) //specify the position as 2 with the argument

memoryContainer[2] = 0x00;

//used to return just the HEX values of the buffer
console.log("HEX values of the buffer", memoryContainer.toString("hex"))
