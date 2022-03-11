let flowerShop = require('./flowerShop.js');
let assert = require('chai').assert;

describe('flowerShop', function () {
    describe('calcPriceOfFlowers', function () {
        it('calcPriceOfFlowers throws Error with invalid input', function () {
            assert.throw(() => flowerShop.calcPriceOfFlowers(1, 1, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers(false, 1, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers(undefined, 1, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers([], 1, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers({}, 1, 1));

            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', '1', 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', false, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', undefined, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', [], 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', {}, 1));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1.1, 1));

            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, '1'));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, false));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, undefined));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, []));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, {}));
            assert.throw(() => flowerShop.calcPriceOfFlowers('flower', 1, 1.1));
        })

        it('calcPriceOfFlowers works properly with valid data', function () {
            assert.equal(flowerShop.calcPriceOfFlowers('flower', 1, 1), 'You need $1.00 to buy flower!');
            assert.equal(flowerShop.calcPriceOfFlowers('flower', 0, 1), 'You need $0.00 to buy flower!');
            assert.equal(flowerShop.calcPriceOfFlowers('flower', 1, 0), 'You need $0.00 to buy flower!');
            assert.equal(flowerShop.calcPriceOfFlowers('flower', -1, -1), 'You need $1.00 to buy flower!');
        });
    });

    describe('checkFlowersAvailable', function () {
        it('checkFlowersAvailable returns flower', function () {
            assert.equal(flowerShop.checkFlowersAvailable('flower', ['lale', 'cwete', 'flower', 'roza']), 'The flower are available!');
            assert.equal(flowerShop.checkFlowersAvailable('flower', ['flower', 'lale', 'cwete', 'roza']), 'The flower are available!');
        });
        it('checkFlowersAvailable returns flower are sold', function () {
            assert.equal(flowerShop.checkFlowersAvailable('flower', ['lale', 'cwete', 'roza']), 'The flower are sold! You need to purchase more!');
        })
    });

    describe('sellFlowers', function () {
        it('sellFlowers throws error with invalid input', function () {
            assert.throw(() => flowerShop.sellFlowers(1, 1));
            assert.throw(() => flowerShop.sellFlowers('1', 1));
            assert.throw(() => flowerShop.sellFlowers(undefined, 1));
            assert.throw(() => flowerShop.sellFlowers({}, 1));
            assert.throw(() => flowerShop.sellFlowers(true, 1));

            assert.throw(() => flowerShop.sellFlowers([], '1'));
            assert.throw(() => flowerShop.sellFlowers([], undefined));
            assert.throw(() => flowerShop.sellFlowers([], {}));
            assert.throw(() => flowerShop.sellFlowers([], []));
            assert.throw(() => flowerShop.sellFlowers([], true));
            assert.throw(() => flowerShop.sellFlowers([], 1.1));
            assert.throw(() => flowerShop.sellFlowers([], -1));
            assert.throw(() => flowerShop.sellFlowers([], 2));
        });
        it('sellFlowers works properly with valid data', function(){
            assert.equal(flowerShop.sellFlowers(['1', '2', '3'], 2), '1 / 2');
        })
    });
});