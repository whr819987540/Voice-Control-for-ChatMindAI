function postMessage(message) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        resolve(response);
      });
    });
  });
}

function updateDom() {
  document.getElementById("not-on-app")?.classList.add("invisible");
  document.getElementById("on-app")?.classList.remove("invisible");
}

postMessage({ key: "sai-on-chatgpt-message" }).then((response) => {
  if (response?.value === undefined) {
    console.log("Not on ChatGPT.");
    return;
  }

  updateDom(response.value);
});
