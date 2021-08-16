const Model = require('../models/order.model');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

const populatedFields = [ 'user', 'book', {
                path: 'book',
                model: 'Book',
                populate : {
                    path: 'author',
                    model: 'Author',  
                }} ];

exports.create = modelData => {
    const model = new Model(modelData);
    return model.save();
};
exports.count = () => Model.count();
exports.findAll = () => Model.find().populate(populatedFields);
//  exports.findAll = () => Model.find().populate({
//             path: 'book',
//             model: 'book',
//             populate : {
//                 path: 'author',
//                 model: 'author',  
//             }})

exports.findOne = id => Model.findById(id).populate(populatedFields);

exports.update = (id, updateData) => Model.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Model.findByIdAndRemove(id);

exports.existsForCategory = (categoryId) => Model.count({ category: categoryId }).then(count => count > 0);
exports.existsForAuthor = (authorId) => Model.count({ author: authorId }).then(count => count > 0);
