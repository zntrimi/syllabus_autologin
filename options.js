document.getElementById('credentialsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  chrome.storage.sync.set({ username, password }, () => {
    alert('Credentials saved');
  });
});