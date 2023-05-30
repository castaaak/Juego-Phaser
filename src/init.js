var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  backgroundColor: '#efefef',
  parent: 'container',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var sprite;
var bote;
var lado = '';

var lado1 = ['l', 'o', 't'];
var lado2 = ['n', 'n', 'n'];
var cruce = 'd';

function preload() {
  this.load.image('oveja', './assets/oveja.png');
  this.load.image('lobo', './assets/Lobo.png');
  this.load.image('trigo', './assets/Trigo.png');
  this.load.image('bote', './assets/bote.png');
  this.load.image('fondo', './assets/rio.jpg');
}

function create() {
  
  this.enBote = false;

  this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.cursor = this.input.keyboard.createCursorKeys();
  
  sprite = this.add.sprite(-180, 0, 'fondo');
  sprite.setOrigin(0, 0);
  
  bote = this.add.image(600, 320, 'bote');
  bote.setScale(0.2);
  // 760,250
  this.oveja = this.add.sprite(760,250, 'oveja');
  this.oveja.setInteractive();
  this.oveja.setOrigin(0.4,1);
  this.oveja.setScale(0.2);
  this.input.setDraggable(this.oveja);
  
  this.lobo = this.add.sprite(680, 150, 'lobo');
  this.lobo.setInteractive();
  this.lobo.setOrigin(0.4,0.9);
  this.lobo.setScale(0.2);
  this.input.setDraggable(this.lobo);
  //860, 300
  this.trigo = this.add.sprite(860, 300, 'trigo');
  this.trigo.setInteractive();
  this.trigo.setScale(0.56);
  this.trigo.setOrigin(0.4,1);
  this.input.setDraggable(this.trigo);
  
}

function logica(sprite){

  if(sprite === 'lobo'){
    if(lado1[0] === 'n'){
      lado1[0] = 'l';
      lado2[0] = 'n';
    }else{
      lado1[0] = 'n';
      lado2[0] = 'l';
    }
  }
  
  if(sprite === 'oveja'){
    if(lado1[1] === 'n'){
      lado1[1] = 'o';
      lado2[1] = 'n';
    }else{
      lado1[1] = 'n';
      lado2[1] = 'o';
    }
  }

  if(sprite === 'trigo'){
    if(lado1[2] === 'n'){
      lado1[2] = 't';
      lado2[2] = 'n';
    }else{
      lado1[2] = 'n';
      lado2[2] = 't';
    }
  }

  if(JSON.stringify(lado1) === JSON.stringify(['l' , 'o' , 'n'])){
    if(cruce === 'i'){
      console.log('Perdió, El lobo se comio la oveja');
    }
  }

  if(JSON.stringify(lado2) === JSON.stringify(['l' , 'o' , 'n'])){
    if(cruce === 'd'){
      console.log('Perdió, El lobo se comio la oveja');
    }
  }

  if(JSON.stringify(lado1) === JSON.stringify(['n' , 'o' , 't'])){
    if(cruce === 'i'){
      console.log('Perdió, la oveja se comió el trigo');
    } 
  }

  if(JSON.stringify(lado2) === JSON.stringify(['n' , 'o' , 't'])){
    if(cruce === 'd'){
      console.log('Perdió, la oveja se comió el trigo');
    } 
  }

}

function update() {
  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;

  });

  this.input.on('dragend', function (pointer, gameObject) {
    let posX = gameObject.x;
    let posY = gameObject.y;
    if (!this.enBote && Phaser.Geom.Rectangle.Contains(bote.getBounds(), gameObject.x, gameObject.y)) {
      gameObject.x = bote.x;
      gameObject.y = bote.y;
      console.log('Drop');
      this.enBote = true;
    }
    if (this.enBote && !Phaser.Geom.Rectangle.Contains(bote.getBounds(), gameObject.x, gameObject.y)) {
      this.enBote = false;
      logica(lado);
      gameObject.x+=10;
      gameObject.y+=10;
    }
    
  });

  /* Mover bote Izquierda*/{
    
    if(this.cursor.left.isDown){
      this.tweens.add({
        targets: bote,
        duration: 400,
        x: 400,
        y: 380
      });
      cruce = 'i';
    }
    /*Oveja*/{
      if(this.cursor.left.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.oveja.x, this.oveja.y)){
        this.tweens.add({
          targets: bote,
          duration: 400,
          x: 400,
          y: 380
        });
    
        this.tweens.add({
          targets: this.oveja,
          duration: 400,
          x: 400,
          y: 380
        });
        lado = 'oveja';
      }
    }

/*Trigo*/{
  if(this.cursor.left.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.trigo.x, this.trigo.y)){
    this.tweens.add({
      targets: bote,
      duration: 400,
      x: 400,
      y: 380
    });

    this.tweens.add({
      targets: this.trigo,
      duration: 400,
      x: 400,
      y: 380
    });
    lado = 'trigo';
  }
}

/*Lobo*/{
  if(this.cursor.left.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.lobo.x, this.lobo.y)){
    this.tweens.add({
      targets: bote,
      duration: 400,
      x: 400,
      y: 380
    });
    
    this.tweens.add({
      targets: this.lobo,
      duration: 400,
      x: 400,
      y: 380
    });
    lado = 'lobo';
  }
}
}

/*Mover Bote Derecha*/{

    if(this.cursor.right.isDown){
      this.tweens.add({
        targets: bote,
        duration: 400,
        x: 600,
        y: 320
      });
      cruce = 'd';
    }
  /*oveja*/{
    if(this.cursor.right.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.oveja.x, this.oveja.y)){
      this.enBote = false;
      this.tweens.add({
        targets: bote,
        duration: 400,
        x: 600,
        y: 320
      });
  
      this.tweens.add({
        targets: this.oveja,
        duration: 400,
        x: 600,
        y: 320
      });
      lado = 'oveja';
    }
  }
  
  /*Trigo*/{
    if(this.cursor.right.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.trigo.x, this.trigo.y)){
      this.tweens.add({
        targets: bote,
        duration: 400,
        x: 600,
        y: 320
      });
  
      this.tweens.add({
        targets: this.trigo,
        duration: 400,
        x: 600,
        y: 320
      });
      lado = 'trigo';
    }
  
  }

  /*Lobo*/{
    if(this.cursor.right.isDown && Phaser.Geom.Rectangle.Contains(bote.getBounds(), this.lobo.x, this.lobo.y)){
      this.tweens.add({
        targets: bote,
        duration: 400,
        x: 600,
        y: 320
      });
    
      this.tweens.add({
        targets: this.lobo,
        duration: 400,
        x: 600,
        y: 320
      });
      lado = 'lobo';
    }
  }

}

}


