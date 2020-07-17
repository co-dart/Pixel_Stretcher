let img;
let imgCenter;
let pixelStretcher;

function preload() {
 img = loadImage("bg3.jpg"); 
}

function setup() {
  img.resize(1080, 720);
  createCanvas(img.width, img.height);
  imgCenter = {
    x: img.width / 2,
    y: img.height / 2
  };
  
  stretcherWidthSlider = createSlider(1, img.width, img.width / 4, 1);
  stretcherHeightSlider = createSlider(1, img.height, img.height / 4, 1);
  pixelStretcher = new PixelStretcher(imgCenter);
}

function draw() {
  pixelStretcher.update();
  
  background(0);
  image(img, 0, 0, img.width, img.height);
  pixelStretcher.show();
}

function keyTyped() {
  if (key === "s") {
    save(img, "out", "png"); 
  }
}

function mousePressed() {
  pixelStretcher.getPixels(); 
}

function mouseDragged() {
  pixelStretcher.drawPixels();
}

function mouseReleased() {
  pixelStretcher.resetPixels(); 
}

class PixelStretcher {
  constructor(center) {
    this.width = width / 5;
    this.height = height / 5;
    this.center = center;
    this.pixels = [];
  }
  
  update() {
    if (keyIsDown(UP_ARROW)) {
      this.height += 1;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.height -= 1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.width += 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.width -= 1;
    }
    this.center = { 
      x: mouseX <= width - this.width / 2 && mouseX >= this.width / 2? mouseX : this.center.x, 
      y: mouseY <= height - this.height / 2 && mouseY >= this.height / 2 ? mouseY : this.center.y }; 
  }
  
  getPixels() {
    let startRow = floor(this.center.y - this.height / 2) * img.width * 4;
    let startCol = floor(this.center.x - this.width / 2) * 4;
    
    img.loadPixels();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width * 4; j++) {
        this.pixels.push(img.pixels[startRow + i * width * 4 + startCol + j]);
      }
    }
  }
  
  drawPixels() {
    let startRow = floor(this.center.y - this.height / 2) * width * 4;
    let startCol = floor(this.center.x - this.width / 2) * 4;
    let k = 0;
    
    img.loadPixels();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width * 4; j++) {
        img.pixels[startRow + i * width * 4 + startCol + j] = this.pixels[k];
        k++;
      }
    }
    img.updatePixels();
  }
  
  resetPixels() {
   this.pixels = []; 
  }
  
  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    
    rectMode(CENTER);
    rect(this.center.x, this.center.y, this.width, this.height);
  }
}

