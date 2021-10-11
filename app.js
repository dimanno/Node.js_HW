const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONNECT_URI, PORT} = require('./config/config');
const userRouter = require('./routes/user.router');
const userLoginRouter = require('./routes/userLogin.router');

const app = express();

mongoose.connect(MONGO_CONNECT_URI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/login', userLoginRouter);

app.listen(PORT, () => {
    console.log(`app.listen PORT ${PORT}`);
});