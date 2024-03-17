const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Assuming you have a 'products' model

// Get all products
router.get('/products', (req, res, next) => {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.log(err);
        });
});

// Get a specific product by ID
router.get('/products/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
});

// Add a new product
router.post('/products', (req, res, next) => {
    const quantity = parseInt(req.body.quantity);
    const newProduct = new Product({
        pname: req.body.pname,
        quantity: quantity
    });

    newProduct.save()
        .then(product => {
            res.json({ msg: 'product added successfully', product: product });
        })
        .catch(err => {
            res.json({ msg: 'failed to add product', error: err });
        });
});

// Remove a product by ID
router.delete('/products/:id', (req, res, next) => {
    Product.remove({ _id: req.params.id })
        .then(result => {
            res.json('product removed successfully');
        })
        .catch(err => {
            res.json(err);
        });
});

// Update a product by ID
router.post('/products/:id', (req, res, next) => {
    const updateProduct = {
        pname: req.body.pname,
        quantity: req.body.quantity
    };

    Product.updateOne({ _id: req.params.id }, updateProduct)
        .then(() => {
            res.status(200).json({
                message: 'product updated successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

module.exports = router;
