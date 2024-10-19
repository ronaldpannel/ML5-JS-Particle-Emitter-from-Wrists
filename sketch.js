//ml5.js

let bodyPose;
let poses = [];
let connections;
let numP = 1;
let particles = [];

function preload() {
  // Load the handPose model
  bodyPose = ml5.bodyPose("BlazePose", { flipped: true });
}

function getPoses(results) {
  poses = results;
}

function mousePressed() {}

function setup() {
  createCanvas(640, 480);

  //Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  bodyPose.detectStart(video, getPoses);
  connections = bodyPose.getSkeleton();
  // console.log(connections);
}

function draw() {
  background(222);
  image(video, 0, 0);

  if (poses.length > 0) {
    let pose = poses[0];
    let x = pose.right_wrist.x;
    let y = pose.right_wrist.y;
    if (pose.right_wrist.confidence > 0.5) {
      fill(255, 0, 0);
      circle(x, y, 20);
      for (let i = 0; i < numP; i++) {
        particles.push(new Particle(x, y, 10));
      }
    }

    if (poses.length > 0) {
      let pose = poses[0];
      let x = pose.left_wrist.x;
      let y = pose.left_wrist.y;
      if (pose.left_wrist.confidence > 0.5) {
        fill(255, 0, 0);
        circle(x, y, 20);
        for (let i = 0; i < numP; i++) {
          particles.push(new Particle(x, y, 10));
        }
      }
    }

    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let keypoint = pose.keypoints[i];
    //   fill(0, 0, 255);
    //   if (keypoint.confidence > 0.1) {
    //     circle(keypoint.x, keypoint.y, 12);
    //   }
    // }
    for (let i = 0; i < connections.length; i++) {
      let connection = connections[i];
      let a = connection[0];
      let b = connection[1];
      let keypointA = pose.keypoints[a];
      let keypointB = pose.keypoints[b];
      // stroke(0, 255, 0);
      // strokeWeight(4);
      // if (keypointA.confidence && keypointB.confidence > 0.1) {
      //   line(keypointA.x, keypointA.y, keypointB.x, keypointB.y);
      // }
    }
  }

  for (let i = particles.length - 1; i > 0; i--) {
    particles[i].draw();
    particles[i].update();

    if (
      particles[i].pos.x > width ||
      particles[i].pos.x < 0 ||
      particles[i].pos.y > height ||
      particles[i].pos.y < 0
    ) {
      particles.splice(i, 1);
    }
  }
  console.log(particles.length)
}

function windowResized() {
  resizeCanvas(640, 480);
}
