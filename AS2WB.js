// ==UserScript==
// @name	Automatic Save to Wayback Machine
// @namespace      Zopolis4
// @description    Automatically saves the pages you visit into the Wayback Machine.
// @version	2.0.0
// @match	*
// @grant    GM_xmlhttpRequest
// @require https://raw.githubusercontent.com/uwx/GM_fetch.ts/fe0cd27fa60efc2975fea55a03d8545ae61aaf34/dist/GM_fetch.js
// @run-at document-start
// ==/UserScript==
 
function parseURLs() {
  // Check if matches "<h2 class="blue">This page is available on the web!</h2>".
  if (document.getElementsByTagName('body')[0].innerHTML.indexOf("<h2 class=\"blue\">This page is available on the web!</h2>") !== -1) {
    var a = location.href;
    a.match(/^https?:\/\/web.archive.org\/web/) ? location.href = decodeURI(a).replace(/^https?:\/\/web.archive.org\/(web\/(\d|\*)+|save)\/(https?:\/\/)?/, "https://web.archive.org/save/") : location.href = "https://web.archive.org/save/" + a;
  }
  savePages();
}
 
function savePages() {
  fetch("https://web.archive.org/save/" + location.href, {
    method: "GET",
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
  });
  console.log("https://web.archive.org/save/" + location.href);
}
 
document.addEventListener("DOMContentLoaded", parseURLs);