function checkForValidUrl(tabId, changeInfo, tab) {
  console.log(tab.url);
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('autohome.com') > -1) {
    // ... show the page action.
    console.log(tab.url);
    chrome.pageAction.show(tabId);
    console.log(tab.tite);
    tab.title = tab.title + "(boosted)";
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
