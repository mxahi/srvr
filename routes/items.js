const express = require('express');
const router = express.Router();
const Item = require('../models/items');

router.get('/items', (req, res, next) => {
    // Getting items list
    Item.find()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/items/:id', (req, res, next) => {
    // Viewing an item
    Item.findById(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/items', (req, res, next) => {
    const quantity = parseInt(req.body.quantity);

    // Adding an item
    let newItem = new Item({
        item_name: req.body.item_name,
        quantity: quantity,
    });

    newItem.save()
        .then(item => {
            res.json({ msg: 'item added successfully', item: item });
        })
        .catch(err => {
            res.json({ msg: 'failed to add item', error: err });
        });
});

router.delete('/items/:id', (req, res, next) => {
    // Removing an item
    Item.findByIdAndDelete(req.params.id)
        .then(deletedItem => {
            if (deletedItem) {
                res.json({ msg: 'Item removed successfully', item: deletedItem });
            } else {
                res.json({ msg: 'Item not found' });
            }
        })
        .catch(err => {
            res.json({ msg: 'Failed to remove item', error: err });
        });
});

// Updating an item
router.post('/items/:id', (req, res, next) => {
    const updateItem = {
        item_name: req.body.item_name,
        quantity: req.body.quantity
    };

    Item.updateOne({ _id: req.params.id }, updateItem)
        .then(() => {
            res.status(201).json({
                message: 'item updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

module.exports = router;
