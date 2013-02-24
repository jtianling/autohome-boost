function scriptLoad(url) {
	  var commonScript = document.createElement('script');
		  commonScript.setAttribute('src', url);
			  commonScript.setAttribute('charset', 'UTF-8');
				  document.getElementsByTagName('head')[0].appendChild(commonScript);
}

