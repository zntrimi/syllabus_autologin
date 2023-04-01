document.getElementById('credentialsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Use the encryption key to encrypt the credentials
  const encryptionKey = await importEncryptionKey(YOUR_ENCRYPTION_KEY);
  const encryptedUsername = await encryptData(encryptionKey, username);
  const encryptedPassword = await encryptData(encryptionKey, password);

  chrome.storage.sync.set({ encryptedUsername, encryptedPassword }, () => {
    alert('Credentials saved');
  });
});