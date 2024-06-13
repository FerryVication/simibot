document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

async function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const messageText = messageInput.value.trim();
    if (messageText !== '') {
      const userMessage = createMessageElement(messageText, 'message-user');
      document.getElementById('chat-messages').appendChild(userMessage);
      messageInput.value = '';
      document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
      // Mengubah status ke "Mengetik..."
      setStatus('Mengetik...');

      // Mengirim pesan ke API dan menunggu respons
      const botResponse = await getBotResponse(messageText);
      const botMessage = createMessageElement(botResponse, 'message-bot');
      document.getElementById('chat-messages').appendChild(botMessage);
      document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
      // Mengubah status kembali ke "Online"
      setStatus('Online');
    };
};

function createMessageElement(text, className) {
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message ' + className;
  messageElement.textContent = text;
  return messageElement;
};

async function getBotResponse(userText) {
  const apiUrl = `https://aemt.me/simi?text=${encodeURIComponent(userText)}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    };
    const data = await response.json();
    return data.result;  // Mengambil hasil dari respons JSON
  } catch (error) {
    console.error('Fetch error:', error);
    return 'hmmm,saya tidak bisa memahami pesan kamu';
  };
};

function setStatus(status) {
  document.getElementById('status').textContent = status;
}