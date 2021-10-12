chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "savePage") {
      fetch(request.target, {
	method: "GET",
	headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });
      sendResponse({url: request.target});
      return true;
    }
});