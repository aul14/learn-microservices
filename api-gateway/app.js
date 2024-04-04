require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const mediaRouter = require('./routes/media');
const orderPaymentsRouter = require('./routes/orderPayments');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const havePermission = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', verifyToken, havePermission('admin'), chaptersRouter);
app.use('/media', verifyToken, havePermission('admin', 'student'), mediaRouter);
app.use('/lessons', verifyToken, havePermission('admin'), lessonsRouter);
app.use('/orders', verifyToken, havePermission('admin', 'student'), orderPaymentsRouter);
app.use('/image-courses', verifyToken, havePermission('admin'), imageCoursesRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/my-courses', verifyToken, havePermission('admin', 'student'), myCoursesRouter);
app.use('/mentors', verifyToken, havePermission('admin'), mentorsRouter);
app.use('/reviews', verifyToken, havePermission('admin', 'student'), reviewsRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
