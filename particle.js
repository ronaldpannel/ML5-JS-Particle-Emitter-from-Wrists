class Particle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.velocity = createVector(random(-1, 1), random(-5, -3));
    this.acc = createVector(0, -3);
    this.gravity = 0.7;
    this.hue = 0;
  }
  update() {
    this.velocity.add(this.acc);
    this.pos.add(this.velocity);
    this.acc.mult(this.gravity);
    this.acc.mult(0)
    if (this.hue < 360) {
      this.hue += 2;
    }else{
        this.hue = 0
    }
  }
  draw() {
    circle(this.pos.x, this.pos.y, this.radius);
    fill(`hsl(${this.hue}, 100%, 50%)`);
    noStroke();
  }
}
