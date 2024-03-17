const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const  Item = module.exports=mongoose.model('Item', ItemSchema);
