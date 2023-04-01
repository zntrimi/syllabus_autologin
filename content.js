chrome.storage.sync.get(['username', 'password'], (credentials) => {
    if (credentials.username && credentials.password) {
      document.getElementById('user_cns_account').value = credentials.username;
      document.getElementById('user_password').value = credentials.password;
  
      document.querySelector('input[type="submit"]').click();
  
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        chrome.tabs.update(currentTab.id, { active: true });
        chrome.tabs.remove(currentTab.id);
        chrome.tabs.reload();
      });
    }
  });