class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = budgetMoney;
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        for (const productInfo of products) {
            let [name, quantity, totalPrice] = productInfo.split(' ').filter(x => x.length > 0);
            quantity = Number(quantity);
            totalPrice = Number(totalPrice);

            if (totalPrice <= this.budgetMoney) {
                if (!this.stockProducts[name]) {
                    this.stockProducts[name] = 0;
                }

                this.stockProducts[name] += quantity;
                this.budgetMoney -= totalPrice;

                this.history.push(`Successfully loaded ${quantity} ${name}`);
            } else {
                this.history.push(`There was not enough money to load ${quantity} ${name}`);
            }
        }

        return this.history.join('\n');
    }

    addToMenu(meal, products, price) {
        if (this.menu[meal]) {
            return `The ${meal} is already in the our menu, try something different.`;
        }

        this.menu[meal] = {
            products,
            price
        }

        if (Object.keys(this.menu).length == 1) {
            return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`;
        }

        return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return `Our menu is not ready yet, please come later...`;
        }

        let result = [];

        for (const meal in this.menu) {
            result.push(`${meal} - $ ${this.menu[meal].price}`);
        }

        return result.join('\n');
    }

    makeTheOrder(meal) {
        let orderedMeal = this.menu[meal];

        if (!orderedMeal) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        for (const productInfo of orderedMeal.products) {
            let [name, quantity] = productInfo.split(' ').filter(x => x.length > 0);
            quantity = Number(quantity);

            if (!this.stockProducts[name] || this.stockProducts[name] < quantity) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }

        for (const productInfo of orderedMeal.products) {
            let [name, quantity] = productInfo.split(' ').filter(x => x.length > 0);
            quantity = Number(quantity);

            this.stockProducts[name] -= quantity;
        }

        this.budgetMoney += orderedMeal.price;

        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${orderedMeal.price}.`;
    }
}

let kitchen = new Restaurant(1000);

kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));