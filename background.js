// how to comment out in JavaScript
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'https://syllabus.sfc.keio.ac.jp/users/sign_in' })
})