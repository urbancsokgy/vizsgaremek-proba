const createError = require('http-errors');
const service = require('../services/book.service');
const model = require('../models/book.model');

exports.create = (req, res, next) => {
    const validationErrors = new model(req.body).validateSync();
    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    return service.create(req.body)
        .then(created => res.status(201).json(created))
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return service.findAll()
        .then(entity => res.json(entity));
};

exports.findOne = (req, res, next) => {
    return service.findOne(req.params.id)
        .then(entity => {
            if (!entity) {
                return next(new createError.NotFound("Book not found"));
            }
            return res.json(entity);
        });
};

exports.update = (req, res, next) => {
    const validationErrors = new model(req.body).validateSync();
    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    return service.update(req.params.id, req.body)
        .then(entity => res.json(entity))
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.delete = (req, res, next) => {
    return service.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.InternalServerError(err.message)));
};
exports.count = (req, res, next) => {
    return service.count()
        .then(entity => res.json(entity))
        .catch(err => internalServerError(next, err));
};