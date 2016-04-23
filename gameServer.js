var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 10500
    , session = require('express-session')
    , bodyParser = require('body-parser');
//app.use(express.cookieParser());
//app.use(express.session({players: {}}));
/**app.use(session({
    secret: 'random_string_goes_here',
    players: 0,
    clients: {},
    users: {},
    proxy: true,
    resave: true,
    saveUninitialized: true
}));*/
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var games = [];

clients = {};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4()
}
var uuid = guid();

var gamePlayers = {};
addPlayer = function(ws){
    var gameAvailable = false;
    for (var i = 0; i < games.length; i++){
        var game = games[i];
        if (game.players<4){
            gameAvailable = true;
            ws.id = guid();
            game.clients[ws.id]=ws;
	    game.players += 1;
            gamePlayers[ws]=game;
        }
    }
    if (!gameAvailable) {
        var mazeNumber = (Math.floor(Math.random() * 6) + 1).toString();
        var newGame = {gameId: guid(), players: 1, clients: {}, users: {}, messages: [], won: false, maze: mazeNumber }; //Add users, clients, messages...
        ws.id = guid();
        newGame.clients[ws.id] = ws;
        gamePlayers[ws] = newGame;
        games.push(newGame);
    }
};

broadcast = function(game,data) {
    console.log("Broadcasting: "+data);
    if (game.players!=0){
        for (c in game.clients){
	    try {
		game.clients[c].send(data);
            }catch(err){
                console.log(err.message); 
            }
        }
    }
};

wss.on('connection', function (ws) {
    var location = parseInt(ws.upgradeReq.url.substr(1), 10);
    addPlayer(ws);
    var currentGame = gamePlayers[ws];
    var index = games.indexOf(currentGame);
    broadcast(games[index], JSON.stringify({type:"updatePlayers",users:currentGame.users, maze: currentGame.maze}));
    ws.on('message', function(data){
        message = JSON.parse(data);
		console.log("Received Message: " + data);
        if (message.type == "updatePlayer"){
            games[index].users[ws.id]=JSON.parse(data);
            broadcast(games[index], JSON.stringify({type:"updatePlayers",users:currentGame.users, maze: currentGame.maze}));
        }
        if (message.type == "message"){
            if (message.message != "" && message.author!=""){
                currentGame.messages.push(message);
		broadcast(games[index], JSON.stringify({type:"message",messages:currentGame.messages}));
            }
            broadcast(games[index], JSON.stringify({type:"updatePlayers",users:currentGame.users, maze: currentGame.maze}));
        }
        if (message.type == "won"){
            games[index].won = true;
            broadcast(games[index], JSON.stringify({type:"won"}));
        }
    });
    ws.on('close', function(data){
        console.log('Disconnected: Player ' + ws.id + ' from Game ' + games[index].gameId);
	delete games[index].clients[ws.id];
        delete games[index].users[ws.id];
        games[index].players -= 1;
        if (games[index].players==0){
	    if (index>-1){
                games.splice(index, 1)
		console.log("Game "+currentGame.gameId+" closed");
            }
        }else{
            if (!games[index].won){
                broadcast(games[index], JSON.stringify({type:"updatePlayers",users:currentGame.users, maze: currentGame.maze, 			status: "One user disconnected but Game "+games[index].gameId+" continues!"}));
            }
        }
    });
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
