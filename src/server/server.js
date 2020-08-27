require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Regiter routes
 */

const Routes = require('./routes');

/**
 * Express app instance
 */

const app = express();

/**
 * Middlwares
 */
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3132);

/**
 * File upload specific middlware
 */
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

/**
 * Entry route
 *
 *
 */

app.use('/', Routes);

/**
 * Server is running on port 3132
 * or the PORT key defined in .env file
 *
 */
app.listen(app.get('port'), function () {
  console.log(
    'Express started on http://localhost:' +
      app.get('port') +
      ' (*) press Ctrl-C to terminate.'
  );
});
