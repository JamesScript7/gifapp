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

(function(window, document) {
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

	console.log("Height:", gifHeight);
	console.log("Width:", gifWidth);

	createGif.addEventListener('click', function(e) {
		var gifHeight = document.querySelector('.video-stream').clientHeight;

		passedOptions = _.merge(_.clone(getSelectedOptions()), {
			'progressCallBack': function(captureProgress) {
				console.log(captureProgress);
			}
		});

		gifshot.createGIF(passedOptions, function(obj) {
			if (!obj.error) {
				var
					image = obj.image,
					animatedImage = document.createElement('img');
					animatedImage.src = image;

					videoStream.classList.add('hidden');

					gifDisplay.appendChild(animatedImage);
					gifDisplay.classList.remove('hidden');
			} else {
				console.log('obj.error', obj.error);
				console.log('obj.errorCode', obj.errorCode);
				console.log('obj.errorMsg', obj.errorMsg);
			}
		});
	}, false);

}(window, document));









