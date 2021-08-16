const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    amount: {
        type: Number,
        default: 1,
        min: 1
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema, 'orders');
//----------------------
// Order.createCollection().then(function(collection) {
//     collection.name='orders'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
// //---------------------

module.exports = Order;
