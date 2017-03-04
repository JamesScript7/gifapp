'use strict';

var constraints = {
	audio: false,
	video: true
}

function success(strm) {
	var video = document.querySelector('video');
	video.src = window.URL.createObjectURL(strm);
}

function error(err) {
	console.log("Error: ", err);
}


navigator.getUserMedia(constraints, success, error);