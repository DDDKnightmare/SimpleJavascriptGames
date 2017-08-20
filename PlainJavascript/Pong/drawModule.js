

drawRect = function(leftX,topY,width,height,color,ctx){
    var aux = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(leftX,topY,width,height);
    ctx.fillStyle = aux;
};

drawBall = function(centerX,centerY,radius,ctx){
    var aux = ctx.fillStyle;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle = aux;
};

drawText = function(text,x,y,fontSize,ctx){
    var aux = ctx.fillStyle;
    var aux2 = ctx.font.split(' ');
    ctx.font = "" + fontSize +"px " + aux2[aux2.length - 1];
    ctx.fillStyle = "white";
    ctx.fillText(text,x,y);
    ctx.fillStyle = aux;
    ctx.font = aux2.join(' ');
};

