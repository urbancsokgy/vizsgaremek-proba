const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema, 'category');
// ----------------------
// Category.createCollection().then(function(collection) {
//     collection.name='category'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------

module.exports = Category;
