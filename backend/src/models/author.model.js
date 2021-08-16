const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    born: Number
}, {
    timestamps: true
});

const Author = mongoose.model('Author', AuthorSchema, 'author');
// ----------------------
// Author.createCollection().then(function(collection) {
//     collection.name='author'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------

module.exports = Author;
