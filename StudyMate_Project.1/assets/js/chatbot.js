// Khởi tạo chatbot
class Chatbot {
  constructor() {
    this.createChatbotUI();
    this.setupEventListeners();
    this.messages = [
      { sender: 'bot', content: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
    ];
    this.renderMessages();
  }

  // Tạo giao diện chatbot
  createChatbotUI() {
    // Tạo container chính
    this.chatbotContainer = document.createElement('div');
    this.chatbotContainer.id = 'chatbot-container';
    this.chatbotContainer.className = 'chatbot-container hidden';
    
    // Tạo header
    const header = document.createElement('div');
    header.className = 'chatbot-header';
    header.innerHTML = `
      <span>Trợ lý ảo</span>
      <span class="close-chatbot">×</span>
    `;
    
    // Tạo khu vực tin nhắn
    this.messagesArea = document.createElement('div');
    this.messagesArea.className = 'chatbot-messages';
    this.messagesArea.id = 'chatbot-messages';
    
    // Tạo khu vực nhập tin nhắn
    const inputArea = document.createElement('div');
    inputArea.className = 'chatbot-input';
    inputArea.innerHTML = `
      <input type="text" id="chatbot-input" placeholder="Nhập tin nhắn...">
      <button id="send-message">Gửi</button>
    `;
    
    // Lắp ráp các thành phần
    this.chatbotContainer.appendChild(header);
    this.chatbotContainer.appendChild(this.messagesArea);
    this.chatbotContainer.appendChild(inputArea);
    
    // Thêm vào body
    document.body.appendChild(this.chatbotContainer);
    
    // Tạo nút toggle
    this.toggleButton = document.createElement('div');
    this.toggleButton.className = 'chatbot-toggle';
    this.toggleButton.textContent = '💬';
    document.body.appendChild(this.toggleButton);
  }

  // Thiết lập sự kiện
  setupEventListeners() {
    // Toggle chatbot
    this.toggleButton.addEventListener('click', () => this.toggleChatbot());
    
    // Đóng chatbot
    document.querySelector('.close-chatbot').addEventListener('click', () => this.toggleChatbot());
    
    // Gửi tin nhắn khi click nút
    document.getElementById('send-message').addEventListener('click', () => this.sendMessage());
    
    // Gửi tin nhắn khi nhấn Enter
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  // Hiển thị/ẩn chatbot
  toggleChatbot() {
    this.chatbotContainer.classList.toggle('hidden');
  }

  // Gửi tin nhắn
  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message !== '') {
      this.addMessage('user', message);
      input.value = '';
      this.processMessage(message);
    }
  }

  // Thêm tin nhắn vào giao diện
  addMessage(sender, content) {
    this.messages.push({ sender, content });
    this.renderMessages();
  }

  // Hiển thị tất cả tin nhắn
  renderMessages() {
    this.messagesArea.innerHTML = this.messages.map(msg => `
      <div class="message ${msg.sender}-message">${msg.content}</div>
    `).join('');
    
    // Tự động cuộn xuống dưới cùng
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
  }

  // Xử lý tin nhắn và trả lời
  processMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response;
    
    if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello')) {
      response = "Xin chào! Bạn cần giúp gì hôm nay?";
    } else if (lowerMessage.includes('giờ') || lowerMessage.includes('thời gian')) {
      const now = new Date();
      response = `Bây giờ là ${now.getHours()} giờ ${now.getMinutes()} phút`;
    } else if (lowerMessage.includes('cảm ơn')) {
      response = "Không có gì! Rất vui được giúp bạn.";
    } else {
      response = "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể hỏi cách khác không?";
    }
    
    // Thêm độ trễ giả lập chatbot đang "suy nghĩ"
    setTimeout(() => {
      this.addMessage('bot', response);
    }, 500);
  }
}

// Khởi tạo chatbot khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
  window.chatbot = new Chatbot();
});