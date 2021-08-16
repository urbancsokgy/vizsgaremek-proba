const Model = require('../models/author.model');
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
        .then(author => {
            return BookService.existsForAuthor(author._id).then(used => {
                if (used) {
                    throw new Error('Author cannot be deleted because it\'s assigned to a book');
                }

                return author.remove();
            })
        });
}
