const Model = require('../models/category.model');
const BookService = require('./book.service');

exports.create = modelData => {
    const model = new Model(modelData);
    return model.save();
};

exports.count = () => Model.count();

exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id).populate();

exports.update = (id, updateData) => Model.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => {
    return Model.findById(id)
        .then(category => {
            return BookService.existsForCategory(category._id).then(used => {
                if (used) {
                    throw new Error('Category cannot be deleted because it\'s assigned to a book');
                }

                return category.remove();
            })
        });
}
