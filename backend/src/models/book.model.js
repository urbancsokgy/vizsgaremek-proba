const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', BookSchema, 'books');
// ----------------------
// Book.createCollection().then(function(collection) {
//     collection.name='books'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------

module.exports = Book;
