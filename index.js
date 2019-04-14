
// variables
// ****************************************************************************
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const environment = require('./config');
const port = environment.remote.port || 8000;
const router = require('./route_modules/router');
const cors = require('cors');

// middleware
// ****************************************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log("User Connected.");
    socket.on("test", (data) => {
        io.emit("Received");
    })
});

// start
// ****************************************************************************
http.listen(port, () => {
    console.log("Listening on port:", port);
});