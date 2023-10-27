let song;
let fft;
let cnv;
let angle = 0;
let isPlaying = false;
let maxRadius;
let lineValues = []; // the color of music line

// input music
function preload() {
  song = loadSound('sample-visualisation.mp3'); 
}

function setup() {
  cnv = createCanvas(600, 600);
  fft = new p5.FFT(0.9, 64); 
  song.connect(fft);
  // press to control the play 
  cnv.mousePressed(pressPlay); 
  angleMode(DEGREES);
  // to make the circle of music line
  maxRadius = min(width, height) / 3; 
  noFill();
  // mid the text
  textAlign(CENTER, CENTER); 
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let spectrum = fft.analyze();
  let totalLines = spectrum.length;
  let spacing = 360 / totalLines;  // line 

  for (let i = 0; i < totalLines; i++) {
    let radius = maxRadius;
    let x1 = radius * cos(angle);
    let y1 = radius * sin(angle);

    // random line color
    if (lineValues[i] === undefined) {
      lineValues[i] = random(0, 360);
    }

    stroke(lineValues[i], 255, 255);

    // line change while the music
    let radius2 = map(spectrum[i], 0, 255, 0, maxRadius); 
    let x2 = (maxRadius - radius2) * cos(angle);
    let y2 = (maxRadius - radius2) * sin(angle);

    line(x1, y1, x2, y2);

    angle += spacing;
  }

  // show explain while press mouse
  fill(255);
  textSize(20);
  if (isPlaying) {
    text('Press to pause', 0, 0);
  } else {
    text('Press to play', 0, 0);
  }
}

function pressPlay() {
  if (song.isPlaying()) {
    song.pause();
    isPlaying = false;
  } else {
    song.play();
    isPlaying = true;
  }
}
