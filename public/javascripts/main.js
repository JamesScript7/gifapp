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
		// gifWidth = document.querySelector('.video-stream').clientWidth,
		text = document.getElementById('text'),
		getSelectedOptions = function() {
			return {
				'gifWidth': '300',
			  'gifHeight': '225',
			  'numFrames': '16',
			  'text': text.value,
			  'fontSize': '24px',
			  'fontFamily': 'Calibri',
			  'fontColor': '#FFFFFF'
			}
		},
	  passedOptions,
	  updateCodeBlock = function(obj) {
	  	obj = obj || {};
	  	var
	  		targetElem = obj.targetElem,
	  		selectedOptions = getSelectedOptions(),
	  		options = (function() {
	  			var obj = {};
	  			_.each(selectedOptions, function(val, key) {
	  				if(val) {
	  					obj[key] = val;
	  				}
	  			});
	  			return obj;
	  		}())
	  },
	// Swapping the video stream with the recorded GIF
		createGif = document.getElementById('create-gif-btn'),
	  gifDisplay = document.querySelector('.gif-display'),
	  videoStream = document.querySelector('.video-stream'),
	  progressBar = document.querySelector('progress'),
	  bindEvents = function() {
			createGif.addEventListener('click', function(e) {
				passedOptions = _.merge(_.clone(getSelectedOptions()), {
					'progressCallBack': function(captureProgress) {
						progressBar.value = captureProgress;

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

			document.addEventListener('change', function(e) {
        updateCodeBlock({
          targetElem: e.target
        });
        // console.log(getSelectedOptions({})["progressCallBack"]);
        console.log(updateCodeBlock);
      });

      document.addEventListener('keyup', function(e) {
        updateCodeBlock({
          targetElem: e.target
        });
      });

	};

	bindEvents();
	updateCodeBlock();
}(window, document));






