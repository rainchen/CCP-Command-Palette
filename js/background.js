// helpers

// usage: alert('request:'+inspect(request));
// then use jsonview (http://jsonviewer.stack.hu/) to see it nicely
function inspect(object) {
  return JSON.stringify(object);
}

// usage: openNewTab({'url': 'chrome://downloads/'});
function openNewTab(obj) {
  chrome.tabs.create(obj);
}

// usage: openPage('about');
function openPage (page) {
  var aboutPageUrl = chrome.extension.getURL(page+'.html');
  openNewTab({url: aboutPageUrl});
}

// flash the badge icon beside the button in tools bar
// usage: flashBadge('NEW!');
// badgeText: Any number of characters can be passed, but only about four can fit in the space
function flashBadge (badgeText, interval, reset) {
  if(flashBadge.stop){
    flashBadge.stop = false;
    return;
  }

  if(!interval)interval = 500;

  chrome.browserAction.setBadgeText({text: badgeText});

  if(!reset){
    setTimeout(function(){
      flashBadge('', interval, badgeText); // clear the badge
    }, interval);
  }else{
    setTimeout(function(){
      flashBadge(reset, interval);
    }, interval);
  }
}

function stopFlashBadge () {
  flashBadge.stop = true;
}

function installed () {
  // try to get noticed
  flashBadge('NEW!');

  // stop the flash after 5 seconds
  setTimeout(stopFlashBadge, 5000);

  // open the about.html
  // openPage('about');
}

// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
// enable/disable "Allow in incognito" will also trigger this(details.reason == 'update')
chrome.runtime.onInstalled.addListener(function(details) {
  // alert('runtime.onInstalled details:'+ inspect(details));
  if(details.reason == 'install'){
    installed();
  }
});

// enable/disable the extension to test installed()
chrome.management.onEnabled.addListener(function(extensionInfo) {
  installed();
});

