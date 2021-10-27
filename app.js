const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const {MONGO_CONNECT_URI, PORT, ALLOWED_ORIGIN, NODE_ENV} = require('./config/config');
const {userRouter, authRouter, postRouter, passwordRouter } = require('./routes');
const {responseStatusCode: {SERVER}} = require('./config/constants');
const ErrorHandler = require('./errors/errorHendler');
const checkDefaultData = require('./util/defoult.data.utill');
const startCrone = require('./cron');
const swaggerJson = require('./doc/swagger.json');

const app = express();

mongoose.connect(MONGO_CONNECT_URI);

app.use(helmet());
app.use(cors({origin: _configCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/password', passwordRouter);
app.use('/post', postRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || SERVER)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`app.listen PORT ${PORT}`);
    checkDefaultData();
    startCrone();
});

function _configCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
