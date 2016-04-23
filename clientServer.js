var server = require('http').createServer()
    , url = require('url')
    , express = require('express')
    , app = express()
    , port = 10301
    , session = require('express-session')
    , bodyParser = require('body-parser');

const fs = require('fs');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/static", express.static(__dirname + "/static"));
app.use("/views", express.static(__dirname + "/views"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.get('/',function (req, res) {
    res.sendFile(__dirname+'/views/index.html');
});
app.post('/views/game.html', urlencodedParser,function(req, res){
    res.sendFile(__dirname+'/views/game.html');
});
server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
