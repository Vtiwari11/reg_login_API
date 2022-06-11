
const  express = require('express');
const  bodyParser = require('body-parser');
const  app = express();

const Routes=require('./router/login');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use('/api', Routes);


const server = app.listen(4000, function () {
console.log('Server is running..');
});

