import { Bits } from '../index'

describe('Bits class', () => {
  it('constructor', () => {
    expect(new Bits(4, 3).toNumber()).toBe(3)
    expect(new Bits(4, '0011').toNumber()).toBe(3)
    expect(new Bits(8).toString()).toBe('00000000')
  })

  it('make sure least Bits length is 1', () => {
    expect(new Bits(0, 3).toNumber()).toBe(1)
    expect(new Bits(-100, 3).toNumber()).toBe(1)
    expect(new Bits(0, 2).toNumber()).toBe(0)
  })

  it('toString()', () => {
    expect(new Bits(4, 3).toString()).toBe('0011')
    expect(new Bits(32).toString()).toBe('00000000000000000000000000000000')
    expect(new Bits(32, 5).toString()).toBe('00000000000000000000000000000101')
  })

  it('toNumber()', () => {
    expect(new Bits(32, 5).toNumber()).toBe(5)
    expect(new Bits(4, '0011').toNumber()).toBe(3)    
  })

  it('at()()', () => {
    expect(new Bits(8, 3).at(0)()).toBeTruthy()
    expect(new Bits(8, 3).at(1)()).toBeTruthy()
  })
})
