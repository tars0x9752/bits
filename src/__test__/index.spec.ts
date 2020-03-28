import { Bits } from '../index'

describe('Bits class', () => {
  test('constructor', () => {
    expect(new Bits(3, 4).toNumber()).toBe(3)
    expect(new Bits('0011', 4).toNumber()).toBe(3)
    expect(new Bits(0, 8).toString()).toBe('00000000')
  })

  test('make sure least Bits length is 1', () => {
    expect(new Bits(3, 0).toNumber()).toBe(1)
    expect(new Bits(3, -100).toNumber()).toBe(1)
    expect(new Bits(2, 0).toNumber()).toBe(0)
  })

  test('toString()', () => {
    expect(new Bits(3, 4).toString()).toBe('0011')
    expect(new Bits().toString()).toBe('00000000000000000000000000000000')
    expect(new Bits(5).toString()).toBe('00000000000000000000000000000101')
  })

  test('toNumber()', () => {
    expect(new Bits(5, 4).toNumber()).toBe(5)
    expect(new Bits('0011', 4).toNumber()).toBe(3)
    expect(new Bits('11111').toNumber()).toBe(31)
    expect(new Bits('100000').toNumber()).toBe(32)
  })

  test('at(pos)()', () => {
    const bits = new Bits(3, 8)

    expect(bits.at(0)()).toBeTruthy()
    expect(bits.at(1)()).toBeTruthy()
    expect(bits.at(2)()).toBeFalsy()
    expect(bits.at(3)()).toBeFalsy()
  })

  test('at(pos)(bit)', () => {
    const bits = new Bits(0, 4) // 0000

    // expect(bits.at(1)(1).toString()).toBe('0010')
    expect(bits.at(1)(true).toString()).toBe('0010')
    expect(bits.at(3)(1).toString()).toBe('1000')
    expect(bits.at(3)(1).at(2)(1).at(3)(false).toString()).toBe('0100')
    expect(bits.at(100)(1).toString()).toBe('0000') // do nothing if out of range 
  })

  test('immutability', () => {
    const bits = new Bits(0, 8) // 00000000

    const bits2 = bits.at(2)(true).at(3)(true)

    expect(bits.toNumber()).toBe(0)
    expect(bits2.toNumber()).toBe(12) // 2 ** 2 + 2 ** 3 = 12
  })
})
