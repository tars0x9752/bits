const isNumber = (val: any): val is number => typeof val === 'number'
const isString = (val: any): val is string => typeof val === 'string'
const toBinaryString = (num: number) => num.toString(2)
const toOneZeroChar = (val: boolean) => (val ? '1' : '0')

export class Bits {
  private arr: boolean[]

  constructor(size: number, val: number | string = 0) {
    const binStr = (isNumber(val) && toBinaryString(val)) || (isString(val) && val) || ''

    const binArr = binStr
      .split('')
      .reverse()
      .map(v => v === '1')

    const arrSize = Math.max(1, size)

    this.arr = [...Array(arrSize)].map((_, i) => (i < binArr.length ? binArr[i] : false))
  }

  at(pos: number) {
    const { arr } = this

    const get = () => {
      if (pos < arr.length) {
        return arr[pos]
      } else {
        return false
      }
    }

    const set = (bit: boolean) => {
      this.arr[pos] = bit
    }

    return (bit?: boolean) => {
      if (bit === undefined) {
        return get()
      } else {
        return set(bit)
      }
    }
  }

  get(pos: number) {
    const { arr } = this

    if (pos < arr.length) {
      return arr[pos]
    } else {
      return false
    }
  }

  set(pos: number) {
    const { arr } = this

    if (pos < arr.length) {
      return (bit: boolean) => {
        this.arr[pos] = bit
      }
    }
  }

  flip() {
    const { arr } = this

    this.arr = [...arr].map(v => !v)
  }

  count() {
    const { arr } = this

    return arr.reduce((acc, curr) => {
      return curr ? acc + 1 : acc
    }, 0)
  }

  toString() {
    const { arr } = this

    return [...arr]
      .reverse()
      .map(toOneZeroChar)
      .join('')
  }

  toNumber() {
    const { arr } = this

    const str = [...arr]
      .reverse()
      .map(toOneZeroChar)
      .join('')

    return parseInt(str, 2)
  }
}
