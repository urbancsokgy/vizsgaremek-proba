require('dotenv').config();
const logger = require('./config/logger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectionString =
  `mongodb+srv://vizsgaremek:${process.env.DB_PASSW}@cluster0.1egzp.mongodb.net/bookstoreDB?retryWrites=true&w=majority`
const options = {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(connectionString, options)
  .then(() => logger.info('MongoDB connection has been established successfully.'))
  .catch(err => {
    logger.error(err);
    process.exit(-1);
  });

const app = require('./server');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
