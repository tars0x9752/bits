import { Bits } from '../index'

// instantiation
const bits = new Bits(3, 4) // 0011
const bits2 = new Bits('0011', 4) // 0011

console.log(bits.toString()) // 0011
console.log(bits2.toString()) // 0011
console.log(bits.toNumber()) // 3
console.log(bits2.toNumber()) // 3

// get the bit at position(index)
console.log(bits.getAt(0)) // true
console.log(bits.getAt(1)) // true
console.log(bits.getAt(2)) // false
console.log(bits.getAt(3)) // false

// immutably set the value for the bit at position(index)
console.log(bits.setAt(0)(false).toString()) // 0010
console.log(bits.setAt(1)(0).toString()) // 0001
console.log(bits.setAt(2)(true).toString()) // 0111
console.log(bits.setAt(3)(1).toString()) // 1011

// immutably set the value using 'at' method
console.log(bits.at(0)(false).toString()) // 0010
console.log(bits.at(1)(0).toString()) // 0001
console.log(bits.at(2)(true).toString()) // 0111
console.log(bits.at(3)(1).toString()) // 1011

// 'at' method can also use as a 'getAt' alternative
console.log(bits.at(0)()) // true
console.log(bits.at(1)()) // true
console.log(bits.at(2)()) // false
console.log(bits.at(3)()) // false

// some utility methods
const emptyBits = new Bits(0, 8) // 00000000
console.log(emptyBits.all()) // false
console.log(emptyBits.none()) // true

const notEmptyBits = emptyBits.at(2)(1) // 00000100
console.log(notEmptyBits.none()) // false
console.log(notEmptyBits.any()) // true

const whateverBits = new Bits('1010111', 8) // 01010111
console.log(whateverBits.count()) // 5
console.log(whateverBits.flip().toString()) // 10101000
