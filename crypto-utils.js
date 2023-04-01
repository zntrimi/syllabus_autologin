async function generateEncryptionKey() {
  async function generateEncryptionKey() {
    const key = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt'],
    )

    // Export the key as a raw binary data (ArrayBuffer)
    const rawKey = await crypto.subtle.exportKey('raw', key)

    // Convert the ArrayBuffer to a Base64 string
    const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)))

    console.log('Encryption Key:', base64Key)
    return base64Key
  }
}

async function encryptData(key, data) {
  async function encryptData(key, data) {
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)

    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encodedData,
    )

    return {
      iv: new Uint8Array(iv),
      data: new Uint8Array(encryptedData),
    }
  }
}

async function decryptData(key, encrypted) {
  async function decryptData(key, encrypted) {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: encrypted.iv.buffer,
      },
      key,
      encrypted.data.buffer,
    )

    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  }
}

async function importEncryptionKey(base64Key) {
  const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0))
  return crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ])
}
