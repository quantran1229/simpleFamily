const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');
require("custom-env").env();
// Set up the express app
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
//require('./routes')(app);
//family api
const familiesController = require('./controllers').families;
app.post('/api/families/',familiesController.create);
app.get('/api/families/',familiesController.list);
app.get('/api/families/:id',familiesController.retrieve);

const housesController = require('./controllers').houses;
app.post('/api/houses/',housesController.create);
app.get('/api/houses/',housesController.list);
app.get('/api/houses/city',housesController.retrieveCity);
app.get('/api/houses/:id',housesController.retrieve);
app.put('/api/houses/:id',housesController.update);
app.delete('/api/houses/:id',housesController.delete );


const membersController = require('./controllers').members;
app.post('/api/members/',membersController.create);
app.get('/api/members/',membersController.list);
app.get('/api/members/:id',membersController.retrieve);
app.put('/api/members/:id',membersController.update);
app.delete('/api/members/:id',membersController.delete);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to test',
}));

io.on('connection', function(socket) {
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

const port = 8000;
app.set('port', port);
http.listen(port);

module.exports = app;
