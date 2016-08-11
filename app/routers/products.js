var express = require('express');
var router = express.Router();
var models = require('../../models');
module.exports = router;

router.get('/', function (req, res, next) {

    var findingProducts;

    if (req.query.sortField) {
        findingProducts = models.Item.findSortedBy(
            req.query.sortField,
            req.query.sortDirection || 'ASC'
        )
    } else {
        findingProducts = models.Item.findAll({});
    }

    findingProducts
        .then(function (items) {
            res.render('products/index', {
                products: items
            });
        })
        .catch(next);
});

router.get('/:itemId', function (req, res, next) {
    models.Item.findById(req.params.itemId)
        .then(function (item) {
            item.findCheaper()
                .then(function (otherItems) {
                    res.render('products/single-product', {
                        product: item,
                        cheaperProducts: otherItems
                    });
                });
        })
        .catch(next);
});

router.get('/new', function (req, res, next) {



});

router.post('/', function (req, res, next) {
    models.Item.create(req.body)
        .then(function (newItem) {
            res.redirect(newItem.link);
        })
        .catch(next);
});