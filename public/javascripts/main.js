'use strict';

// Access and display the video stream
navigator.mediaDevices.getUserMedia({
	video: true
}).then(function success(stream) {
	var video = document.querySelector('video');
	video.src = window.URL.createObjectURL(stream) || stream;
}).catch(function error(err) {
	console.error("Error:", err);
});


// GIF settings
var
	gifHeight = document.querySelector('.video-stream').clientHeight,
	gifWidth = document.querySelector('.video-stream').clientWidth,
	text = document.getElementById('text'),
	getSelectedOptions = function() {
		return {
			'gifWidth': gifWidth,
		  'gifHeight': gifHeight,
		  'numFrames': '12',
		  'text': text.value,
		  'fontSize': '24px',
		  'fontFamily': 'Calibri',
		  'fontColor': '#FFFFFF'
		}
	},
// Swapping the video stream with the recorded GIF
	createGif = document.getElementById('create-gif-btn'),
  gifDisplay = document.querySelector('.gif-display'),
  videoStream = document.querySelector('.video-stream'),
  passedOptions;


createGif.addEventListener('click', function(e) {
	passedOptions = _.merge(_.clone(getSelectedOptions()), {
		'progressCallBack': function(captureProgress) {
			console.log(captureProgress);
		}
	});

	gifshot.createGIF(passedOptions, function(obj) {
		if (!obj.error) {
			
		}
	})









});











