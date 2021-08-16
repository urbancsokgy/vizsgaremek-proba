const createError = require('http-errors');
const service = require('../services/category.service');
const model = require('../models/category.model');

const internalServerError = (next, err) => {
    return next(new createError.InternalServerError(err.message));
}
const badRequest = (next, err) => {
    return next(new createError.BadRequest(typeof err === 'string' ? err : err.message));
}

exports.create = (req, res, next) => {
    const validationErrors = new model(req.body).validateSync();
    if (validationErrors) {
        return badRequest(next, validationErrors);
    }

    return service.create(req.body)
        .then(created => res.status(201).json(created))
        .catch(err => internalServerError(next, err));
};

exports.count = (req, res, next) => {
    return service.count()
        .then(entity => res.json(entity))
        .catch(err => internalServerError(next, err));
};

exports.findAll = (req, res, next) => {
    return service.findAll()
        .then(entity => res.json(entity))
        .catch(err => badRequest(next, err));
};

exports.findOne = (req, res, next) => {
    return service.findOne(req.params.id)
        .then(entity => {
            if (!entity) {
                return next(new createError.NotFound("Category not found"));
            }
            return res.json(entity);
        })
        .catch(err => badRequest(next, err));
};

exports.update = (req, res, next) => {
    const validationErrors = new model(req.body).validateSync();
    if (validationErrors) {
        return badRequest(next, validationErrors);
    }

    return service.update(req.params.id, req.body)
        .then(entity => res.json(entity))
        .catch(err => internalServerError(next, err));
};

exports.delete = (req, res, next) => {
    return service.delete(req.params.id)
        .then(() => res.end())
        .catch(err => internalServerError(next, err));
};