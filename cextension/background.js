// event to run execute.js content when extension's button is clicked
chrome.action.onClicked.addListener(execScript);

async function execScript() {
  const tabId = await getTabId();
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['execute.js']
  })
}

async function getTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return (tabs.length > 0) ? tabs[0].id : null;
}

var menuItem = {
  "id": "Fake Test",
  "title": "Give me the stories",
  "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "Fake Test" && clickData.selectionText) {
    var url = "https://code.peikai.pii.at/site?text=" + fixedEncodeURI(clickData.selectionText);
    var createData = {
      "url": url,
      "type": "popup",
      "top": 5,
      "left": 5,

    };
    chrome.windows.create(createData, function () { });
  }
});