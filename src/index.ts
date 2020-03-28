const isNumber = (val: any): val is number => typeof val === 'number'

const isString = (val: any): val is string => typeof val === 'string'

const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

const isBooleanArray = (val: any): val is boolean[] => {
  return Array.isArray(val) && val.length > 0 && val.every(isBoolean)
}
const toBinaryString = (num: number) => num.toString(2)

const toOneZeroChar = (val: boolean) => (val ? '1' : '0')

export class Bits {
  private arr: boolean[]

  constructor(val: number | string | boolean[] = 0, size: number = 32) {
    if (isBooleanArray(val)) {
      this.arr = val
    } else {
      const binStr = (isNumber(val) && toBinaryString(val)) || (isString(val) && val) || ''

      const binArr = binStr
        .split('')
        .reverse()
        .map((v) => v === '1')

      const arrSize = Math.max(1, size)

      this.arr = [...Array(arrSize)].map((_, i) => (i < binArr.length ? binArr[i] : false))
    }
  }

  at(pos: number) {
    const { getAt, setAt } = this

    const get = () => {
      return getAt(pos)
    }

    const set = (bit: boolean | number) => {
      return setAt(pos)(bit)
    }

    return <T extends boolean>(bit?: T): T extends boolean ? Bits : boolean => {
      return (isBoolean(bit) ? set(bit) : get()) as T extends boolean ? Bits : boolean
    }
  }

  getAt = (pos: number) => {
    const { arr } = this

    if (pos < arr.length) {
      return arr[pos]
    } else {
      return false
    }
  }

  setAt = (pos: number) => {
    let arr = [...this.arr]

    return (bit: boolean | number) => {
      if (pos < arr.length) {
        arr[pos] = !!bit

        return new Bits(arr)
      } else {
        return this
      }
    }
  }

  flip() {
    const flipped = [...this.arr].map((v) => !v)

    return new Bits(flipped)
  }

  count() {
    const { arr } = this

    return arr.reduce((acc, curr) => {
      return curr ? acc + 1 : acc
    }, 0)
  }

  size() {
    return this.arr.length
  }

  all() {
    const { arr } = this

    return arr.every((v) => v)
  }

  any() {
    const { arr } = this

    return arr.some((v) => v)
  }

  none() {
    const { arr } = this

    return arr.every((v) => !v)
  }

  toString() {
    const { arr } = this

    return [...arr].reverse().map(toOneZeroChar).join('')
  }

  toNumber() {
    const { arr } = this

    const str = [...arr].reverse().map(toOneZeroChar).join('')

    return parseInt(str, 2)
  }
}
