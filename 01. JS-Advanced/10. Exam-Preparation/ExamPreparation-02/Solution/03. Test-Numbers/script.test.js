let testNumbers = require('./script.js');
let assert = require('chai').assert;

describe("testNumbers", function () {
    describe('sumNumbers', () => {
        it('returns undefined', () => {
            assert.equal(testNumbers.sumNumbers('a', 1), undefined);
            assert.equal(testNumbers.sumNumbers(1, 'a'), undefined);
            assert.equal(testNumbers.sumNumbers(true, 'a'), undefined);
            assert.equal(testNumbers.sumNumbers('a', true), undefined);
            assert.equal(testNumbers.sumNumbers(undefined, 1), undefined);
            assert.equal(testNumbers.sumNumbers(1, undefined), undefined);
        });

        it('works properly', () => {
            assert.equal(testNumbers.sumNumbers(1, 1), 2);
            assert.equal(testNumbers.sumNumbers(-1, -1), -2);
        });
    });

    describe('numberChecker', () => {
        it('throws error with incorrect data', () => {
            assert.throw(() => {
                testNumbers.numberChecker('a');
                testNumbers.numberChecker(true);
                testNumbers.numberChecker(undefined);
            });
        });

        it('works with even number', () => {
            assert.equal(testNumbers.numberChecker(2), 'The number is even!')
        });

        it('works with odd number', () => {
            assert.equal(testNumbers.numberChecker(1), 'The number is odd!')
        });
    });

    describe('averageSumArray', () => {
        it('works properly', () => {
            assert.equal(testNumbers.averageSumArray([0]), 0)
            assert.equal(testNumbers.averageSumArray([1, 2]), 1.5)
            assert.equal(testNumbers.averageSumArray([-1, 0, 1]), 0)
        });
    });
});