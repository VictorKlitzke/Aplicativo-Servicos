const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routers/router');

const corsOptions = {
  origin: 'http://192.168.1.5:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', authRouter);


module.exports = app;