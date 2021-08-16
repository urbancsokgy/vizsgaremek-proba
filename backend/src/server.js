const express = require('express');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('./config/cors');

//------------------------
app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(require('./routes/auth.route'));

app.use('/api/users', require('./routes/user.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/authors', require('./routes/author.route'));
app.use('/api/books', require('./routes/book.route'));
app.use('/api/orders', require('./routes/order.route'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./docs/swager.yaml')));

// fallback for Angular routes
// app.use('/*', (req, res, next) => {
//     res.sendFile('index.html', { root: __dirname + '/../public' });
// });

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
