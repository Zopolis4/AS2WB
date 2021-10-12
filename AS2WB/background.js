chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "savePage") {
      fetch("https://web.archive.org/save/" + request.url, {
	method: "GET",
	headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
      sendResponse({url: "https://web.archive.org/save/" + request.url});
      return true;
    }
});