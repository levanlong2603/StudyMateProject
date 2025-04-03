export const Chatbot = {
    init: function() {
      this.bindEvents();
      this.setupWelcomeMessage();
    },
    
    bindEvents: function() {
      // Toggle chatbot
      $('#toggleChatbot').click(() => this.toggleChatbot());
      
      // Minimize/close
      $('#minimizeChatbot').click(() => this.minimizeChatbot());
      $('#closeChatbot').click(() => this.closeChatbot());
      
      // Send message
      $('#sendMessage').click(() => this.sendMessage());
      $('#chatbotInput').keypress(e => {
        if (e.which === 13) this.sendMessage();
      });
      
      // Voice input
      $('#voiceInput').click(() => this.toggleVoiceInput());
      
      // Quick replies
      $(document).on('click', '.quick-reply', function() {
        const query = $(this).data('query');
        $('#chatbotInput').val(query);
        Chatbot.sendMessage();
      });
    },
    
    toggleChatbot: function() {
      const widget = $('#chatbotWidget');
      const isVisible = widget.hasClass('active');
      
      if (isVisible) {
        widget.removeClass('active');
      } else {
        widget.addClass('active');
        $('.notification-dot').hide();
        this.scrollToBottom();
      }
    },
    
    minimizeChatbot: function() {
      $('#chatbotWidget').removeClass('active');
    },
    
    closeChatbot: function() {
      $('#chatbotWidget').removeClass('active');
    },
    
    sendMessage: function() {
      const input = $('#chatbotInput');
      const message = input.val().trim();
      
      if (message !== '') {
        this.addUserMessage(message);
        input.val('');
        this.showTypingIndicator();
        
        // Simulate bot response after delay
        setTimeout(() => {
          this.removeTypingIndicator();
          this.handleBotResponse(message);
        }, 1000 + Math.random() * 2000);
      }
    },
    
    addUserMessage: function(message) {
      const messagesContainer = $('#chatbotMessages');
      const messageElement = `
        <div class="message user-message">
          <div class="message-content">
            ${message}
          </div>
        </div>
      `;
      messagesContainer.append(messageElement);
      this.scrollToBottom();
    },
    
    addBotMessage: function(message) {
      const messagesContainer = $('#chatbotMessages');
      const messageElement = `
        <div class="message bot-message">
          <div class="bot-avatar">
            <img src="./assets/img/robot-ai-small.png" alt="Robot AI">
          </div>
          <div class="message-content">
            ${message}
          </div>
        </div>
      `;
      messagesContainer.append(messageElement);
      this.scrollToBottom();
    },
    
    showTypingIndicator: function() {
      const messagesContainer = $('#chatbotMessages');
      const typingElement = `
        <div class="message bot-message typing-indicator-container">
          <div class="bot-avatar">
            <img src="./assets/img/robot-ai-small.png" alt="Robot AI">
          </div>
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      `;
      messagesContainer.append(typingElement);
      this.scrollToBottom();
    },
    
    removeTypingIndicator: function() {
      $('.typing-indicator-container').remove();
    },
    
    scrollToBottom: function() {
      const messagesContainer = $('#chatbotMessages');
      messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    },
    
    handleBotResponse: function(userMessage) {
      const lowerMessage = userMessage.toLowerCase();
      let response = "";
      
      // Simple response logic - can be replaced with AI API
      if (lowerMessage.includes("chào") || lowerMessage.includes("hello")) {
        response = "Xin chào! Tôi là StudyMate AI. Tôi có thể giúp gì cho bạn về tài liệu học tập, lịch thi hoặc thông tin PTIT?";
      } 
      else if (lowerMessage.includes("tài liệu") || lowerMessage.includes("tìm kiếm")) {
        response = "Bạn có thể tìm kiếm tài liệu theo chuyên ngành:<br><br>" +
          "• <a href='#' class='doc-link'>Giáo trình Công nghệ thông tin</a><br>" +
          "• <a href='#' class='doc-link'>Bài giảng Điện tử viễn thông</a><br>" +
          "• <a href='#' class='doc-link'>Đề thi các năm</a>";
      }
      else if (lowerMessage.includes("lịch thi") || lowerMessage.includes("thời khóa biểu")) {
        response = "Bạn có thể xem lịch thi trên hệ thống QLDT của PTIT. Đây là link truy cập:<br>" +
          "<a href='https://qldt.ptit.edu.vn' target='_blank'>https://qldt.ptit.edu.vn</a>";
      }
      else {
        response = "Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:<br><br>" +
          "• Tài liệu học tập<br>" +
          "• Lịch thi, thời khóa biểu<br>" +
          "• Thông tin về PTIT<br>" +
          "• Hướng dẫn sử dụng hệ thống";
      }
      
      this.addBotMessage(response);
    },
    
    toggleVoiceInput: function() {
      const voiceBtn = $('#voiceInput');
      voiceBtn.toggleClass('listening');
      
      if (voiceBtn.hasClass('listening')) {
        // Start voice recognition
        this.startVoiceRecognition();
      } else {
        // Stop voice recognition
        this.stopVoiceRecognition();
      }
    },
    
    startVoiceRecognition: function() {
      // Simulate voice recognition
      console.log("Voice recognition started");
      // In a real app, integrate with Web Speech API
    },
    
    stopVoiceRecognition: function() {
      console.log("Voice recognition stopped");
    },
    
    setupWelcomeMessage: function() {
      // Show notification dot after 5 seconds if chatbot is closed
      setTimeout(() => {
        if (!$('#chatbotWidget').hasClass('active')) {
          $('.notification-dot').show();
        }
      }, 5000);
    }
  };