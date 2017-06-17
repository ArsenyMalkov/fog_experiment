var particles = [];
var particleCount = 60;

var maxVelocity = 1;

var targetFPS = 33;

var canvasWidth;
var canvasHeight;

var canvasRightPadding;
var canvasLeftPadding = 50;
var canvasTopPadding = 50;
var canvasBottomPadding = 50;

var imageObj = new Image();
imageObj.src = "https://image.ibb.co/eYQcYF/fog.png";
imageObj.onload = function() {
    particles.forEach(function(particle) {
            particle.setImage(imageObj);
    });
};

function Particle(context) {
    this.x = 0;
    this.y = 0;

    this.velocityX = 0;
    this.velocityY = 0;

    this.context = context;
    
    this.draw = function() {
        if (this.image) {
            this.context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);         
        }
    };

    this.update = function() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x >= canvasWidth - canvasRightPadding) {
            this.velocityX = -this.velocityX;
            this.x = canvasWidth - canvasRightPadding;
        } else if (this.x <= 0 - canvasLeftPadding) {
            this.velocityX = -this.velocityX;
            this.x = 0 - canvasLeftPadding;
        }
				
        if (this.y >= canvasHeight + canvasBottomPadding) {
            this.velocityY = -this.velocityY;
            this.y = canvasHeight + canvasBottomPadding;
        } else if (this.y <= 0 - canvasTopPadding) {
            this.velocityY = -this.velocityY;
            this.y = 0 - canvasTopPadding;
        }
    };

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.setVelocity = function(x, y) {
        this.velocityX = x;
        this.velocityY = y;
    };
    
    this.setImage = function(image){
        this.image = image;
    }
}

function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var contextCanvasLeft;
var contextCanvasRight;

function init() {
		canvasHeight = window.innerHeight;
    canvasWidth = window.innerWidth * 0.4;
    canvasRightPadding = canvasWidth * 0.7;

    var canvasLeftFog = document.getElementById('canvasLeftFog');
    canvasLeftFog.height = canvasHeight;
    canvasLeftFog.width = canvasWidth;
    
    if (canvasLeftFog.getContext) {
        contextCanvasLeft = canvasLeftFog.getContext('2d');

        for (var i = 0; i < particleCount; ++i){
            var particle = new Particle(contextCanvasLeft);
            particle.setPosition(generateRandom(0, canvasWidth - canvasRightPadding), generateRandom(0, canvasHeight));
            particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
            particles.push(particle);            
        }
    }
    
   	var canvasRightFog = document.getElementById('canvasRightFog');
  	canvasRightFog.height = canvasHeight;
  	canvasRightFog.width = canvasWidth;
   
   	if (canvasRightFog.getContext) {
     	   contextCanvasRight = canvasRightFog.getContext('2d');
   	     for (var i = 0; i < particleCount; ++i){
   	         var particle = new Particle(contextCanvasRight);
     	       particle.setPosition(generateRandom(0, canvasWidth - canvasRightPadding), generateRandom(0, canvasHeight));
    	        particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
    	        particles.push(particle);            
   	     }
 	   }
}

function draw() {
    contextCanvasLeft.clearRect(0, 0, canvasWidth, canvasHeight);
    contextCanvasRight.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach(function(particle) {
        particle.draw();
    });
}

function update() {
    particles.forEach(function(particle) {
        particle.update();
    });
}

init();

if (contextCanvasLeft && contextCanvasRight) {
    setInterval(function() {
        update();
        draw();
    }, 1000 / targetFPS);
}