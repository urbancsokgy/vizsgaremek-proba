const Model = require('../models/user.model');

exports.create = model => {
  return Model.count({ email: model.email })
    .then(existingWithThisEmail => {
      if (existingWithThisEmail > 0) {
        throw new Error('Email already used');
      }
    })
    .then(() => model.save());
}
exports.count = () => Model.count();
exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id).populate();

exports.update = (id, updateData) => Model.findByIdAndUpdate(id, updateData, {new: true});
