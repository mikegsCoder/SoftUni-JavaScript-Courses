
class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }

    loadingVegetables(vegetables) {
        const resultArr = [];
        for (const vegetable of vegetables) {
            let [type, quantity, price] = vegetable.split(' ');
            quantity = Number(quantity);
            price = Number(price);

            if (this.availableProducts.some(x => x.type === type)) {
                let wantedVegetable = this.availableProducts.find(x => x.type === type);
                wantedVegetable.quantity += quantity;

                if (price > wantedVegetable.price) {
                    wantedVegetable.price = price;
                }
            } else {
                const newVegetable = {
                    type,
                    quantity,
                    price
                }

                this.availableProducts.push(newVegetable);
            }

            if (!resultArr.includes(type)) {
                resultArr.push(type);
            }
        }

        return `Successfully added ${resultArr.join(', ')}`;
    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0;

        for (const product of selectedProducts) {
            let [type, quantity] = product.split(' ');

            let wantedVegetable = this.availableProducts.find(x => x.type === type);

            if (wantedVegetable === undefined) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }

            if (quantity > wantedVegetable.quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }

            totalPrice += quantity * wantedVegetable.price;
            wantedVegetable.quantity -= quantity;
        }

        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }

    rottingVegetable(type, quantity) {
        let wantedVegetable = this.availableProducts.find(x => x.type === type);

        if (wantedVegetable === undefined) {
            throw new Error(`${type} is not available in the store.`);
        }

        if (quantity > wantedVegetable.quantity) {
            wantedVegetable.quantity = 0;

            return `The entire quantity of the ${type} has been removed.`;
        }

        wantedVegetable.quantity -= quantity;

        return `Some quantity of the ${type} has been removed.`;
    }

    revision() {
        const resultArr = [];
        resultArr.push('Available vegetables:');

        for (const vegetable of this.availableProducts.sort((a, b) => a.price - b.price)) {
            resultArr.push(`${vegetable.type}-${vegetable.quantity}-$${vegetable.price}`);
        }

        resultArr.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);

        return resultArr.join('\n');
    }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());