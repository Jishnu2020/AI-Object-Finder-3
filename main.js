synth = window.speechSynthesis;
objectDetector = "";
status = "";
value = "";
objects = [];
function setup() {
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380, 380);
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function start() {
value = document.getElementById("input").value;
console.log("Value of input box = " + value);
}
function draw() {
image(video, 0, 0, 380, 380);
if(status != "") {
r = random(255);
g = random(255);
b = random(255);
objectDetector.detect(video, getResult);
for(i = 0; i < objects.length; i++) {
console.log(objects);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
fill(r, g, b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r,g,b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == value) {
document.getElementById("object_found").innerHTML = value + " Found";
video.stop();
objectDetector.detect(getResult);
utterThis = new SpeechSynthesisUtterance(value + " Found");
synth.speak(utterThis);
}
else if(objects[i].label != value) {
document.getElementById("object_found").innerHTML = value + " Not Found";
}
}
}
}
function modelLoaded() {
console.log("Model Loaded!");
status = true;
}
function getResult(error, results) {
if(error) {
console.log(error);
}
else {
console.log(results);
objects = results;
}
}