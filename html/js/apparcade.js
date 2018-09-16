
var score=document.getElementById('score');//score element

//gems to be collected by the player
var Gem=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Gem Orange.png';
}
//checking whether the player collects it and giving him score.
Gem.prototype.checkCollection=function(){
    if((player.x < this.x + 80) &&
    (player.x + 80 > this.x) &&
    (player.y < this.y + 60) &&
    (60 + player.y > this.y)){

    this.x=900;
    this.y=900;//making the gem to disappear after collecting
    player.score+=100;
    score.textContent=player.score;
    }

};
//drawing the gem in the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};


//Enemies to be attacked
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x >505){
        this.x=0;
    }
    this.x+=this.speed*dt;
    this.y=this.y;
    this.checkCollision();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//checking collision of enemy with the player,if collided the player is reset.
Enemy.prototype.checkCollision=function(){
        if((player.x < this.x + 80) &&
        (player.x + 80 > this.x) &&
        (player.y < this.y + 60) &&
        (60 + player.y > this.y)){

            player.x=200;
            player.y=400;
            
            
        }
};

//Declaring the player object
var Player = function(x,y) {
    this.x=x;
    this.y=y;
    this.score=0;
    score.textContent=this.score;
    this.sprite = 'images/char-pink-girl.png';
};

//updating the player position
Player.prototype.update = function() {

this.x=this.x;
this.y=this.y;

console.log("the value of this.y is"+this.y);

};

// Draw the Player  on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//displaying the score for player
Player.prototype.points=function(){
    score.textContent=this.score;
};
//handling keyboard input for player
Player.prototype.handleInput = function(keypress) {
    this.keypress=keypress;
    console.log("i am inside keyboard event"+this.keypress+this.x+this.y);
    if (this.keypress== 'left' && this.x > 0) {
        console.log("i am inside left");
        this.x -= 102;
    };

    if (this.keypress == 'right' && this.x < 350) {
        this.x += 102;
        };

    if (this.keypress == 'up' && this.y > 0) {
        this.y -= 83;
        };

    if (this.keypress == 'down' && this.y < 380) {
        this.y += 83;
       };    
};
var allEnemies=[];//array for holding all enemies

//creating objects for enemies,player and gem.
var e1=new Enemy(10,60,85);
var e2=new Enemy(10,145,65);
var e3=new Enemy(10,225,165);
var e4=new Enemy(10,225,85);
var player=new Player(202,405);
var gem=new Gem(202,145);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies.push(e1);
allEnemies.push(e2);
allEnemies.push(e3);
allEnemies.push(e4);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});
