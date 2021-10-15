const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {MONGO_CONNECT_URI, PORT} = require('./config/config');
const {userRouter, authRouter, postRouter } = require('./routes');

const app = express();

mongoose.connect(MONGO_CONNECT_URI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`app.listen PORT ${PORT}`);
});
