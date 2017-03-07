(function(window, document) {
	var
		// var gifWidth = document.querySelector('.video-stream').clientWidth;
		// var gifHeight = document.querySelector('.video-stream').clientHeight;
		text = document.getElementById('text'),
		getSelectedOptions = function() {
			return {
				'gifWidth': '300',
			  'gifHeight': '225',
			  'numFrames': '16',
			  'text': text.value,
			  'fontSize': '32px',
			  'fontFamily': 'Arial',
			  'fontColor': '#FFFFFF'
			}
		},
	// Swapping the video stream with the recorded GIF
		createGif = document.getElementById('create-gif-btn'),
	  gifDisplay = document.querySelector('.gif-display'),
	  videoStream = document.querySelector('.video-stream'),
	  progressBar = document.querySelector('progress'),
	  passedOptions;

    navigator.mediaDevices.getUserMedia({
      video: {
         width: getSelectedOptions()['gifWidth'],
          height: getSelectedOptions()['gifHeight']
      	}
    }).then(function success(stream) {
      var video = videoStream;
      video.src = window.URL.createObjectURL(stream) || stream;
    }).catch(function error(err) {
      console.error("Error:", err);
    });

	  var bindEvents = function() {
			createGif.addEventListener('click', function(e) {
				passedOptions = _.merge(_.clone(getSelectedOptions()), {
					'progressCallback': function(captureProgress) {
						progressBar.classList.remove('hidden');
						progressBar.value = captureProgress;

					}
				});
				gifshot.createGIF(passedOptions, function(obj) {
					if (!obj.error) {
						var
							image = obj.image,
							animatedImage = document.createElement('img');
							animatedImage.src = image;

							progressBar.classList.add('hidden');

							gifDisplay.appendChild(animatedImage);
							gifDisplay.classList.remove('hidden');
					} else {
						console.log('obj.error', obj.error);
						console.log('obj.errorCode', obj.errorCode);
						console.log('obj.errorMsg', obj.errorMsg);
					}
				});
			}, false);

	};

	bindEvents();
}(window, document));



