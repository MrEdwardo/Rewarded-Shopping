var mode = "off";
var affiliateId = "rewarshopp04-21";
var tags = {"www.amazon.de":"rewarshopp04-21"};

// Check the mode initially
chrome.storage.sync.get('mode', function(items) {

    if(items != null && items['mode'] != null) {
      if(items['mode'] === 'on'){
        console.log("got mode from storage: ON");
        mode = 'on';
      } else if(items['mode'] === 'off') {
        mode ='off';
        console.log("got mode from storage: OFF");
      }
    } else {
      
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if(changeInfo.url != null) { // URL has changed

      var bgPage = chrome.extension.getBackgroundPage();
      
      if(bgPage.mode === "off") { // extension is turned off

        console.log("mode is OFF.");

      } else if (bgPage.mode === "on") { // turned on - do the URL insertion

        insertAffiliateTag(changeInfo.url, tab);

      } 
    }
});

function insertAffiliateTag(url, tab) {

  console.log("New request: " + url);

  if(url.indexOf("amazon") != -1 && url.indexOf("&tag=" + affiliateId) == -1) {

    var newUrl = calculateNewUrl(url);

    if(newUrl != null) {
      console.log("got an updated url: " + newUrl);
      // navigate tab to the updated URL:
      chrome.tabs.update(tab.id, {url: newUrl});
    }
  }
}

// returns the url with affiliate tag, if required.
// returns null otherwise.
function calculateNewUrl(url) {
  // trim any www:
  var trimmedUrl = trimUrl(url);
  var newUrl = null;
  console.log("calculating new url. Trimmed URL = " + trimmedUrl);

  if(tags[trimmedUrl] != null) {
    console.log("...we have a tag for this URL.");

    // check for existing url params:
    if(url.indexOf('?') != -1) {
      // check if another affiliate tag exists:
      var existingTag = getQueryVariable('tag');
      if(existingTag != null){
        // replace it with our own tag:
        console.log("replacing tag with our own...");
        newUrl = url.replace(existingTag, tags[trimmedUrl]);
      } else {
        console.log("appending tag with question mark...");
        newUrl = url + '&tag=' + tags[trimmedUrl];
      }
    } else {
      console.log("appending tag...");
      newUrl = url + '?&tag=' + tags[trimmedUrl];
    } 
  }
  return newUrl;
}

function trimUrl(url) {
  if(url.indexOf('&') != -1) {
      url = url.substring(0, url.indexOf('&'));
  }
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.substring(0, url.indexOf('/'));
  return url;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}



