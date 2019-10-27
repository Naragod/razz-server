// variables
// ****************************************************************************
const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const environment = require('./config');

const port = environment.remote.port || 8000;
const socketConnection = require('./sockets/socketConnection')(io);
const routes = require('./routes/routes');

// middleware
// ****************************************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
// ****************************************************************************
app.use(routes);

// establish socket connection
// ****************************************************************************
socketConnection.connect();

// start
// ****************************************************************************
http.listen(port, () => {
  console.log('Listening on port:', port);
});
