"use strict";
exports.__esModule = true;
exports.PriorityQueue = void 0;
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(params) {
        var _this = this;
        this.values = [];
        this.length = 0;
        this.comparatorFn = params.comparatorFn;
        if (params.intialValues) {
            params.intialValues.forEach(function (value) {
                _this.insert(value);
            });
        }
    }
    PriorityQueue.prototype.insert = function (value) {
        if (this.values.length <= this.length) {
            this.values.length = Math.max(1, this.values.length * 2);
        }
        this.values[this.length] = value;
        this.length++;
        this.swim();
    };
    PriorityQueue.prototype.remove = function () {
        if (this.length === 0)
            return null;
        var node = this.values[0];
        // Only one element in the array
        if (this.length === 1) {
            this.values[0] = null;
            this.length = 0;
            return node;
        }
        this.values[0] = this.values[this.length - 1];
        this.values[this.length - 1] = null;
        this.length--;
        this.sink();
        return node;
    };
    PriorityQueue.prototype.swim = function () {
        var index = this.length - 1;
        while (true) {
            var parentIndex = this.getParentIndex(index);
            if (parentIndex !== null && this.comparatorFn(this.values[index], this.values[parentIndex]) < 0) {
                var temp = this.values[index];
                this.values[index] = this.values[parentIndex];
                this.values[parentIndex] = temp;
                index = parentIndex;
                continue;
            }
            return;
        }
    };
    PriorityQueue.prototype.sink = function () {
    };
    PriorityQueue.prototype.getParentIndex = function (nodeIndex) {
        if (nodeIndex === 0)
            return null;
        return (nodeIndex - 1) >>> 1;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
var q = new PriorityQueue({
    comparatorFn: function (a, b) { return a - b; },
    intialValues: [32, 5, 44, 10, 1]
});
console.log(q.values);
