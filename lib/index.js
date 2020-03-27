"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isNumber = function (val) { return typeof val === 'number'; };
var isString = function (val) { return typeof val === 'string'; };
var toBinaryString = function (num) { return num.toString(2); };
var toOneZeroChar = function (val) { return (val ? '1' : '0'); };
var Bits = /** @class */ (function () {
    function Bits(size, val) {
        var binStr = (isNumber(val) && toBinaryString(val)) || (isString(val) && val) || '';
        var binArr = binStr
            .split('')
            .reverse()
            .map(function (v) { return v === '1'; });
        this.arr = __spreadArrays(Array(size)).map(function (_, i) { return (i < binArr.length ? binArr[i] : false); });
    }
    Bits.prototype.at = function (pos) {
        var _this = this;
        var arr = this.arr;
        var get = function () {
            if (pos < arr.length) {
                return arr[pos];
            }
            else {
                return false;
            }
        };
        var set = function (bit) {
            _this.arr[pos] = bit;
        };
        return function (bit) {
            if (bit === undefined) {
                return get();
            }
            else {
                return set(bit);
            }
        };
    };
    Bits.prototype.get = function (pos) {
        var arr = this.arr;
        if (pos < arr.length) {
            return arr[pos];
        }
        else {
            return false;
        }
    };
    Bits.prototype.set = function (pos) {
        var _this = this;
        var arr = this.arr;
        if (pos < arr.length) {
            return function (bit) {
                _this.arr[pos] = bit;
            };
        }
    };
    Bits.prototype.flip = function () {
        var arr = this.arr;
        this.arr = __spreadArrays(arr).map(function (v) { return !v; });
    };
    Bits.prototype.count = function () {
        var arr = this.arr;
        return arr.reduce(function (acc, curr) {
            return curr ? acc + 1 : acc;
        }, 0);
    };
    Bits.prototype.toString = function () {
        var arr = this.arr;
        return __spreadArrays(arr).reverse()
            .map(toOneZeroChar)
            .join('');
    };
    Bits.prototype.toNumber = function () {
        var arr = this.arr;
        var str = __spreadArrays(arr).reverse()
            .map(toOneZeroChar)
            .join('');
        return parseInt(str, 2);
    };
    return Bits;
}());
exports.Bits = Bits;
var bits = new Bits(4, '1110');
console.log(bits.toString());
