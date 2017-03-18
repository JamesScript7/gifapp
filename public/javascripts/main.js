(function(window, document) {
	var
		text = document.getElementById('text'),
		getSelectedOptions = function() {
			return {
				'gifWidth': '300',
			  'gifHeight': '225',
			  'numFrames': '24',
			  'text': text.value,
			  'fontSize': '24px',
			  'fontFamily': 'Arial',
			  'instaFilter': false,
			  'vhsFilter': false
			}
		},
		// Video stream and GIF processing
		createGif = document.getElementById('create-gif-btn'),
	  gifDisplay = document.querySelector('.gif-display'),
	  videoStream = document.querySelector('.video-stream'),
	  progressBar = document.querySelector('progress'),
	  loadingMsg = document.querySelector('.loading'),
	  removeButton = document.getElementById('remove-btn'),
	  gifArray = [],
	  passedOptions;

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
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
					loadingMsg.classList.remove('hidden');
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
					loadingMsg.classList.add('hidden');

					var newList = document.createElement('li');
					newList.appendChild(animatedImage);

					gifArray.push(newList);


					// for (var i = (gifArray.length - 1); i >= 0; i--) {
					// 	gifDisplay.prepend(gifArray[i]);
					// 	// gifDisplay.appendChild(gifArray[i]);
					// }

					for (var i = 0; i < gifArray.length; i++) {
						gifDisplay.prepend(gifArray[i]);
						// gifDisplay.appendChild(gifArray[i]);
					}

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

	$('[type=radio]').change(function(e) {
		var select = e.target.id;
		switch (select) {
			case 'insta':
				getSelectedOptions = function() {
					return {
						'gifWidth': '300',
					  'gifHeight': '225',
					  'numFrames': '24',
					  'text': text.value,
					  'fontSize': '24px',
					  'fontFamily': 'Arial',
					  'instaFilter': true,
					  'vhsFilter': false
					}
				}
				break;
			case 'vhs':
				getSelectedOptions = function() {
					return {
						'gifWidth': '300',
					  'gifHeight': '225',
					  'numFrames': '24',
					  'text': text.value,
					  'fontSize': '24px',
					  'fontFamily': 'Arial',
					  'instaFilter': false,
					  'vhsFilter': true
					}
				}
				break;
			default:
				getSelectedOptions = function() {
						return {
							'gifWidth': '300',
						  'gifHeight': '225',
						  'numFrames': '24',
						  'text': text.value,
						  'fontSize': '24px',
						  'fontFamily': 'Arial',
						  'instaFilter': false,
						  'vhsFilter': false
						}
					}
		}
	});


}(window, document));