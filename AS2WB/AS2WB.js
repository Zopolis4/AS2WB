function parseURLs() {
  var url = "https://web.archive.org/save/" + location.href;
  if (location.hostname == "web.archive.org") {
    url = "https://web.archive.org/save/" + encodeURI(decodeURI(location.href).replace(/(https?:\/\/)?(www\.)?web\.archive\.org\/(|save|web\/\*\/[0-9]+|web\/[0-9]+|\*\/[0-9]+|web\/\*\/|web|\*\/|[0-9]+)?(\/|id_\/)?/, ""));
  }
  savePages(url);
}

function savePages(url) {
  chrome.runtime.sendMessage({action: "savePage", target: url}, function(response) {
    console.log(response.url);
  });
}

document.addEventListener("DOMContentLoaded", parseURLs);