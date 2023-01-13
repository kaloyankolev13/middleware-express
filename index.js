const express = require('express');
const morgan = require('morgan');
const app = express();

const AppError = require('./AppError');
// app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = Date.now();
  req.method = 'GET'; // change the method to GET for every request
  next();
});

app.use('/dogs', (req, res, next) => {
  console.log('I love dogs!');
  next();
});

// Really simple authentication
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chickennugget') {
    next();
  } else {
    throw new AppError('Password required', 401);
    // res.send('Sorry you need a password!');r
    // throw new AppError(401, 'Password required');
  }
};

app.get('/secret', verifyPassword, (req, res) => {
  res.send('My secret');
});

// app.use(morgan('dev'));
// app.use((req, res, next) => {
//   console.log('Hello');
//   return next(); // return next() will stop the execution of the function
// });
// app.use((req, res, next) => {
//   console.log('Hello 2');
//   next();
// });

app.get('/', (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);
  res.send('Hello World!');
});

app.get('/dog', (req, res) => {
  console.log(`Request Date: ${req.requestTime}`);

  res.send('Woof!');
});

app.get('/error', (req, res) => {
  chicken.fly();
});

app.get('/admin', (req, res) => {
  throw new AppError('You are not an admin', 403);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// app.use((err, req, res, next) => {
//   console.log('**********************************');
//   console.log('***************ERROR**************');
//   console.log('**********************************');
//   res.status(500).send('Something broke!');
// });
// app.use((err, req, res, next) => {
//   console.log('**********************************');
//   console.log('***************ERROR**************');
//   console.log('**********************************');
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 500, messege = 'Something went wrong' } = err;
  res.status(status).send(messege);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
