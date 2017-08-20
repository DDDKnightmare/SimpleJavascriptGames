
var canvas = document.getElementById("gamingCanvas");
var ctx = canvas.getContext("2d");

var frameRate = 15;

var running;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

var screen = "s";

var paddleSpace = canvas.width / 80;

var scoreP1 = 0;
var scoreP2 = 0;

const WINNING_SCORE = 3;

var paddleWidth = canvas.width / 80;
var paddleHeight = canvas.height / 6;

var P1Modifier = {
    
    height : 1
    
};

var P2Modifier = {
    
    height : 1,
    speed : 1
    
};

var ballModifier = {
    
    radius : 1,
    speedX : 1,
    speedY : -1
    
};

var paddleP1 = {
    
    x : paddleSpace,
    y : canvas.height / 2 - paddleHeight / 2 * P1Modifier.height
    
};

var paddleP2 = {
    x : canvas.width - paddleSpace - paddleWidth,
    y : canvas.height / 2 - paddleHeight / 2 * P2Modifier.height,
    speed : paddleHeight / 8
};

var ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : (canvas.width / 80 + canvas.height / 60)/2,
    speedX : paddleWidth * 0.85,
    speedY : paddleWidth * 0.85
};

var winner;