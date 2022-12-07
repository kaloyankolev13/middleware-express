const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = Date.now();
  req.method = 'GET'; // change the method to GET for every request
  next();
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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
