class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = Number(budgetMoney);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        for (let product of products) {
            let [name, qty, price] = product.split(' ');
            qty = Number(qty);
            price = Number(price);

            if (price <= this.budgetMoney) {
                if (!this.stockProducts[name]) {
                    this.stockProducts[name] = 0;
                }
                this.stockProducts[name] += qty;

                this.budgetMoney -= price;
                this.history.push(`Successfully loaded ${qty} ${name}`);
            } else {
                this.history.push(`There was not enough money to load ${qty} ${name}`);
            }
        }

        return this.history.join("\n");
    }

    addToMenu(meal, neededProducts, price) {
        price = Number(price);

        if (!this.menu[meal]) {
            this.menu[meal] = {
                products: {},
                price: price
            }

            for (let product of neededProducts) {
                let [name, qty] = product.split(' ');
                qty = Number(qty);

                this.menu[meal].products[name] = qty;
            }

            let mealCount = Object.keys(this.menu).length
            if (mealCount == 1) {
                return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
            } else {
                return `Great idea! Now with the ${meal} we have ${mealCount} meals in the menu, other ideas?`
            }
        } else {
            return `The ${meal} is already in the our menu, try something different.`;
        }
    }

    showTheMenu() {
        if (Object.keys(this.menu).length == 0) {
            return "Our menu is not ready yet, please come later...";
        } else {
            let result = [];
            for (let meal in this.menu) {
                result.push(`${meal} - $ ${this.menu[meal].price}`);
            }

            return result.join("\n");
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        } else {
            const needPro = {};
            for (let product in this.menu[meal].products) {
                if (!this.stockProducts[product] || this.stockProducts[product] < this.menu[meal].products[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
                } else {
                    needPro[product] = this.menu[meal].products[product];
                }
            }

            for (let need in needPro) {
                this.stockProducts[needPro] -= needPro[need];
            }

            this.budgetMoney += this.menu[meal].price;

            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
        }
    }
}


//Input1:
let kitchen1 = new Restaurant(1000);
console.log(kitchen1.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
// Output:
/*
Successfully loaded 10 Banana
Successfully loaded 20 Banana
Successfully loaded 50 Strawberries
Successfully loaded 10 Yogurt
There was not enough money to load 500 Yogurt
Successfully loaded 5 Honey
*/
console.log('--------------');

//Input2:
let kitchen2 = new Restaurant(1000);
console.log(kitchen2.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen2.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
// Output:
/*
Great idea! Now with the frozenYogurt we have 1 meal in the menu, other ideas?
Great idea! Now with the Pizza we have 2 meals in the menu, other ideas?
*/
console.log('--------------');

//Input3:
let kitchen3 = new Restaurant(1000);
console.log(kitchen3.showTheMenu());
// Output:
/*
frozenYogurt - $ 9.99
Pizza - $ 15.55
*/
console.log('--------------');

//Input4:
let kitchen4 = new Restaurant(1000);
kitchen4.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen4.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen4.makeTheOrder('frozenYogurt'));
// Output:
/*
Your order (frozenYogurt) will be completed in the next 30 minutes and will cost you 9.99.
*/