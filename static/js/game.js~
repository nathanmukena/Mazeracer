/**
 * Created by nmukena on 3/26/16.
 */

src="https://code.jquery.com/jquery-2.2.0.min.js"
var websocketHandle;
var WIDTH = 480, HEIGHT = 480;
var initX = 100, initY = 35;
var context = $("#canvas")[0].getContext('2d');
var speedX = 5, speedY = 5;
var boundary = 0;
var isWin = 0;
var users = {};
var img = new Image();
var ax = 0, ay = 0; //acceleration
var clientServerAddress = "http://cslinux.utm.utoronto.ca:10301";
var gameServerAddress = "ws://cslinux.utm.utoronto.ca:10500"
var pseudo = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
var uuid = guid();

userSize = function(){
	i=0;
	for (user in users){
		i++;
	}
	return i;
}

var player = {
    name: "",
    x: initX,
    y: initY,
    id: uuid,
    type: "updatePlayer"
};
var message = {
    type: "message",
    author: "",
    message: ""
};
var messages = [];
var i = 0;
var colors = {
    0: "blue",
    1: "red",
    2: "green",
    3: "yellow",
    4: "purple",
};
var keysDown=[];
document.body.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
    update(); //added update here
});
document.body.addEventListener("keyup", function (event) {
    keysDown[event.keyCode] = false;
    update();//added update here
});

function checkWin(){
    var imgdata = context.getImageData(player.x - 2, player.y -2, 6, 6);//7.5 from 15 by Kamal
    var pix = imgdata.data;
    for (var i = 0; n = pix.length, i < n; i += 4) {
        if ((pix[i] == 255) && (pix[i+1] == 170) && (pix[i+2] == 204)) {
            isWin = 1;
        }
    }
}
function drawRect(player, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(player.x, player.y,15/3,0, 2*Math.PI);
    context.stroke();
    context.fill();
}
function draw() {
    drawOnBoard();
    var i = 0;
    for (user in users){
        drawRect(users[user], colors[i]);
        i++;
    }
}
function drawOnBoard() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.drawImage(img, 0, 0);
}
function collide() {
    var imgdata = context.getImageData(player.x - 2, player.y - 2, 6, 6);//7.5 from 15 by Kamal
    var pix = imgdata.data;
    for (var i = 0; n = pix.length, i < n; i += 4) {
        if ((pix[i] == 0) && (pix[i+1]) == 0 && (pix[i+2]==0)) { //updated collide 
            boundary = 1;
        }
    }
}
function playerCollision() {
	for (user in users){
		if (users[user].id != player.id){
			for (var y = player.y - 2; y < player.y + 4; y++) {
				for (var x = player.x - 2; x < player.x + 4; x++) {
					//console.log("player.x="+x+", player.y="+y+", user.x="+users[user].x +", user.y="+users[user].y);
					if (users[user].x-2<=x && x<=users[user].x+4 && users[user].y-2<=y && y<=users[user].y+4){
						boundary = 1;
					}
				}
			}
		}
	}
}
function drawAtBeg() {
    drawOnBoard();
    i = 0;
    for (user in users){
        if (user.id != player.id){
            drawRect(users[user], colors[i]);
            i++;
        }
    }                           
}

//onDeviceMotion works inconjunction with onload
function onDeviceMotion(event){
	ax = (event.accelerationIncludingGravity.x)*5;
    ay = (event.accelerationIncludingGravity.y)*5;
	update();
}

//Update is the key control function 
function update(){
    //Mobile Device Check;
    if (ay < -1) keysDown[38] = true; //up
    if (ay >  1) keysDown[40] = true; //down
    if (ax >  1) keysDown[37] = true;
    if (ax < -1) keysDown[39] = true;
    if (keysDown[38]) {
        if (player.y - speedY > 0) {
            player.y -= speedY;
            drawOnBoard();
            collide();
			playerCollision();
            if (boundary == 1) {
                player.y = player.y + speedY;
                boundary = 0;
            }
            websocketHandle.send(JSON.stringify(player));
        }
    }
    if (keysDown[40]) { /* 40 = Down arrow */
        if (player.y + speedY < HEIGHT) {
            player.y += speedY;
            drawOnBoard();
            collide();
			playerCollision();
            if (boundary == 1) {
                player.y -= speedY;
                boundary = 0;
            }
            websocketHandle.send(JSON.stringify(player));
        }
    }

    if (keysDown[37]) {  /* 37 Left key */
        if (player.x - speedX > 0) {
            player.x -= speedX;  // changed from + to -
            drawOnBoard();
            collide();
			playerCollision();
            if (boundary == 1) {
                player.x += speedX;
                boundary = 0;
            }
            websocketHandle.send(JSON.stringify(player));
        }
    }

    if (keysDown[39]) {/* 39 = Right arrow */
        if ((player.x + speedX < WIDTH)) {
            player.x += speedX;
            drawOnBoard();
            collide();
			playerCollision();
            if (boundary == 1) {
                player.x -= speedX;
                boundary = 0;
            }
            websocketHandle.send(JSON.stringify(player));
        }
    }

    checkWin();
    if (isWin) {
	alert("You won!");
	reset();
    }

    //reset 
	if (ay != 0 || ax != 0 ){
		ay = 0;
		ax = 0;
		keysDown[39] = false;
        keysDown[37] = false;
        keysDown[40] = false;
        keysDown[38] = false;
	}	

    //setTimeout(update, 10); removed this, no longer necessary
}; //end of keydown

function reset() {
    drawAtBeg();
    player.x = initX;
    player.y = initY;
    keysDown[39] = false;
    keysDown[37] = false;
    keysDown[40] = false;
    keysDown[38] = false;
    websocketHandle.send(JSON.stringify({type:"won"}));
}

function sendMessage(){
    if ($("#message").val()!=""){
        message.author = player.name;
        message.message = $("#message").val();
        websocketHandle.send(JSON.stringify(message));
    }
}


//update(); removed
var ar=new Array(33,34,35,36,37,38,39,40);
$(document).keydown(function(e) {
    var key = e.which;
    //console.log(key);
    //if(key==35 || key == 36 || key == 37 || key == 39)
    if($.inArray(key,ar) > -1) {
        e.preventDefault();
        return false;
    }
    return true;
});
userSize = function(){
    i=0;
    for (user in users){
        i++;
    }
    return i;
}
var first = true;
// Document Ready Function takes care of Websocket elements and music
$(document).ready(function(){
    var mazeNumber;
    player.name == "";
	while (player.name == ""){
	    player.name = window.prompt("Please enter your name.","");
	}
    window.addEventListener("devicemotion",onDeviceMotion,false);
    websocketHandle = new WebSocket(gameServerAddress);
    websocketHandle.onopen = function () {
        alert("Connected!");
    };
    websocketHandle.onclose = function () {
        alert("Disconnected!");
    };
    websocketHandle.onmessage = function (msg) {
        var msgData = JSON.parse(msg.data);
        console.log(msgData.maze);
        if (msgData.type == "updatePlayers"){
            users = msgData.users;
            console.log(userSize());
            if (first){
                player.x = player.x + (userSize()-1)*25
                mazeNumber = msgData.maze;
                websocketHandle.send(JSON.stringify(player));
                websocketHandle.send(JSON.stringify(message));
                first = false;
                img.src = clientServerAddress+"/static/mazes/maze"+mazeNumber+".gif"; //created with the help of http://hereandabove.com/maze/
                drawAtBeg();
            }
            draw();
        }
        if (msgData.type == "message"){
            messages = msgData.messages;
			console.log(messages);
			var mess = "";
			var name = "";
			for (var i = 0; i < messages.length; i++){
				name = messages[i].author;
				mess =mess +"<div class='messages'><p class='message-text'>"+ messages[i].message + "</p><p class='author'>" + name + "</p></div></br>";
			}
            var html = $(mess);
			$("#ChatHistory").html(html);
        }
        if (msgData.type == "won"){
            websocketHandle.close();
	    if (isWin==1){
		window.location.href = "win.html";
	    }else{
		window.location.href = "lose.html";
	    }
        }
    };
    websocketHandle.onerror = function (msg) {
        alert("Error!");
    };
    $("#send-message").submit(function(){
        sendMessage();
        $('#message').val("");
        return false;
    });
   

//AUDIO     
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://s1download-universal-soundbank.com/mp3/sounds/8298.mp3');
    audioElement.setAttribute('autoplay', 'autoplay'); // turn off if wished 
    audioElement.addEventListener('load', function() {
        this.currentTime = 10;
        this.play();
    }, false);
    

    
    $('#play').click(function() {
        audioElement.play();
        var $this = $(this);
        $this.toggleClass('active');      
        if($this.hasClass('active')){
            audioElement.pause();
            $this.text('Play');
        }
        else{
            $this.text('Pause');
        }
        
    });
    
   var onEnded = function() {
      this.play();
    };
    
    audioElement.addEventListener('ended', onEnded, false);
    
    //END OF AUDIO






    setTimeout(setInterval(draw, 1), 1000);
});
$( window ).unload(function() {
    alert("Unloading");
    websocketHandle.close();
});
