// ==UserScript==
// @name	Automatic Save to Wayback Machine
// @namespace      Zopolis4
// @description    Automatically saves all the pages (and their outlinks) you visit into the Wayback Machine.
// @version	1.0.1
// @match	*
// @run-at document-start
// ==/UserScript==

(function() {
        //Sets variable "xhr" to be used in places of the full command. (standard practice)
	var xhr = new XMLHttpRequest();
        //Sets variable "adrs1" as the adress to be used in the later request.
	var adrs1 = 'http://web.archive.org/save/' + encodeURI(decodeURI(location.href));


	document.addEventListener("DOMContentLoaded", function() {
		// Check if matches "<h2 class="blue">This page is available on the web!</h2>".
		if (document.getElementsByTagName('body')[0].innerHTML.indexOf("<h2 class=\"blue\">This page is available on the web!</h2>") !== -1) {
			var a = location.href;
			a.match(/^https?:\/\/web.archive.org\/web/) ? location.href = decodeURI(a).replace(/^https?:\/\/web.archive.org\/(web\/(\d|\*)+|save)\/(https?:\/\/)?/, "https://web.archive.org/save/") : location.href = "https://web.archive.org/save/" + a;
		}
	}, false);

	// Save the page you have just visited.
        // Sends the GET request for the created url.
	xhr.open("GET", adrs1);
        // Sets the correct headers to be used in the GET request.
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	console.log(adrs1);

	// Save all the links you can see on a page.
	window.addEventListener("load", function() {
			var sent_array = [];
			for (var elements1 = document.getElementsByTagName("a"), i = elements1.length - 1; i >= 0; i--) {
				var URL1 = decodeURI(elements1[i].href);
				if (URL1.match(/^https?:\/\/web.archive.org\/.*http/)) {
					URL1.replace(/^https?:\/\/web.archive.org\/web\/[0-9]+\/http/, "http");
				}
				if ((URL1.match(location.hostname)) && -1 === sent_array.indexOf(URL1)) {
					sent_array[sent_array.length] = URL1;
                                        // Sets variable "adrs2" to be used in the following request
					var adrs2 = 'http://web.archive.org/save/' + encodeURI(URL1);
                                        // Sends the GET request for the created url.
					xhr.open("GET", adrs2);
                                        // Sets the correct headers to be used in the GET request.
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				}
				console.log('http://web.archive.org/save/' + encodeURI(URL1));
				// Sends the completed GET requests to the console (for debugging purposes).
			}
		}

	);
}());
