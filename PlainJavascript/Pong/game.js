
canvas.onmousemove = function(evt){
    paddleP1.y = evt.clientY - (window.pageYOffset == undefined ? 0 : window.pageYOffset) - paddleHeight / 2 * P1Modifier.height;
    
    
    drawScreen();
};



drawScreen = function(){
    
    drawRect(0,0,canvas.width,canvas.height,"black",ctx);
    
    if(screen === "s" || screen === "g"){
        drawRect(paddleP1.x,paddleP1.y,paddleWidth,paddleHeight,"white",ctx);
        drawRect(paddleP2.x,paddleP2.y,paddleWidth,paddleHeight,"white",ctx);
        drawBall(ball.x,ball.y,ball.radius,ctx);
        
        if(screen === "g"){
            
            drawText(scoreP1, canvas.width * 1/ 5, canvas.height / 5, canvas.height/30, ctx);
            drawText(scoreP2, canvas.width * 4/ 5, canvas.height / 5, canvas.height/30, ctx);
            
        }
    }
    
    if(screen === "e"){
        if(scoreP1 >= WINNING_SCORE){
            winner = 1;
        }else if(scoreP2 >= WINNING_SCORE){
            winner = 2;
        }
        drawText("PLAYER " + winner + " WON!", canvas.width/ 2.6, canvas.height * 2/6, canvas.height / 20, ctx);
    }
    if(screen === "e" || screen === "s"){
        drawText("CLICK TO START",canvas.width / 2.6, canvas.height * 5/6,canvas.height / 20 ,ctx);
    }
};




window.onload = function(){
    
    
    drawScreen();
    
    canvas.onclick = function(){

        switch(screen){
            case "s" :      case "e":

                start();
                break;
        }

    }
    
};

reset = function(){
    paddleP2.y = canvas.height / 2 - paddleHeight / 2;
    paddleP1.y = paddleP2.y;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
//    P1Modifier.height = 1;
//    P2Modifier.height = 1;
//    ballModifier.radius = 1;
    ballModifier.speedX = 1;
    ballModifier.speedY = -1;
    
}

start = function(){
    
    screen = "g";
    running = setInterval(game,1000/frameRate);
    
};
        
game = function(){

    
    
    drawScreen();
    
    moveCPU();
    moveBall();
    
    
};

moveBall = function(){
    
    
    if(ball.x - ball.radius <= paddleP1.x + paddleWidth){
        
        if(!checkCollision(false)){
            return;
        }
        
    }else if(ball.x + ball.radius >= paddleP2.x){

        if(!checkCollision(true)){
            return;
        }

    }
    
    if(ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height){
        ballModifier.speedY *= -1;
    }
    
    ball.x += ball.speedX * ballModifier.speedX;
    ball.y += ball.speedY * ballModifier.speedY;
};

checkCollision = function(player2){
    
    if(player2){
        if(ball.y >= paddleP2.y && ball.y <= paddleP2.y + paddleHeight * P2Modifier.height){
            
            ballModifier.speedX = -1-Math.abs(paddleHeight* P2Modifier.height - (paddleP2.y + P2Modifier.height * paddleHeight / 2 - ball.y))/(paddleHeight * P2Modifier.height);
            
            ballModifier.speedY = 2*(-(paddleP2.y + P2Modifier.height * paddleHeight / 2 - ball.y)/(P2Modifier.height * paddleHeight/2));
            
            return true;
            
        }else{
            
            scoreP1++;
            reset();
            if(scoreP1 >= WINNING_SCORE){
            
                screen = "e";
                clearInterval(running);
                drawScreen();
                scoreP1 = 0;
                scoreP2 = 0;
            }
            
            return false;
            
        }
    }else if(ball.y >= paddleP1.y && ball.y <= paddleP1.y + paddleHeight * P1Modifier.height){
        
        ballModifier.speedX = 1+Math.abs(paddleHeight* P1Modifier.height - (paddleP1.y + P1Modifier.height * paddleHeight / 2 - ball.y))/(paddleHeight * P1Modifier.height);
        ballModifier.speedY = 2*(-(paddleP1.y + P1Modifier.height * paddleHeight / 2 - ball.y)/(P1Modifier.height * paddleHeight/2));
        
        return true;
        
    }else{
        scoreP2++;
        reset();
        if(scoreP2 >= WINNING_SCORE){
            
            screen = "e";
            clearInterval(running);
            drawScreen();
            scoreP1 = 0;
            scoreP2 = 0;
        }
        
        return false;
    }
    
};

moveCPU = function(){
    if(paddleP2.y + 0.15*paddleHeight * P2Modifier.height >= ball.y){
        paddleP2.y -= paddleP2.speed;
    }else if(paddleP2.y + 0.85*paddleHeight * P2Modifier.height <= ball.y){
        paddleP2.y += paddleP2.speed;
    }
};