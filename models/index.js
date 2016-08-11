var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wall-o-mart');

var Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: { // In cents
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    getterMethods: {
        cost: function () {
            var priceString = this.price.toString();
            return '$' + priceString.slice(0, -2) + '.' + priceString.slice(-2);
        },
        link: function () {
            return '/products/' + this.id;
        }
    },
    classMethods: {
        findSortedBy: function (field, order) {
            return Item.findAll({
                order: field + ' ' + order
            });
        }
    },
    instanceMethods: {
        findCheaper: function () {
            return Item.findAll({
                where: {
                    price: {
                        $lt: this.price
                    }
                }
            });
        }
    }
});

module.exports = {
    Item: Item
};