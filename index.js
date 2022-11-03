const express = require('express');
const morgan = require('morgan');
const app = express();

morgan('tiny');
app.use(morgan('tiny'));
app.use((req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/dog', (req, res) => {
  res.send('Woof!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
