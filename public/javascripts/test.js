var videoStream = document.querySelector('.video-stream');
var front = false;

document.getElementById('edit-btn').onclick = function() { front = !front};

var constraints = { video: { facingMode: ("environment") } };

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  var video = videoStream;
  video.src = window.URL.createObjectURL(stream) || stream;
}).catch(function error(err) {
  console.error("Error:", err);
});

console.log(constraints.video.facingMode);