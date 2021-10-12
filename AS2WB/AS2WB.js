function parseURLs() {
  // Check if matches "<h2 class="blue">This page is available on the web!</h2>".
  if (document.getElementsByTagName('body')[0].innerHTML.indexOf("<h2 class=\"blue\">This page is available on the web!</h2>") !== -1) {
    var a = location.href;
    a.match(/^https?:\/\/web.archive.org\/web/) ? location.href = decodeURI(a).replace(/^https?:\/\/web.archive.org\/(web\/(\d|\*)+|save)\/(https?:\/\/)?/, "https://web.archive.org/save/") : location.href = "https://web.archive.org/save/" + a;
  }
  savePages();
}

function savePages() {
  chrome.runtime.sendMessage({action: "savePage", url: location.href}, function(response) {
    console.log(response.url);
  });
}

document.addEventListener("DOMContentLoaded", parseURLs);