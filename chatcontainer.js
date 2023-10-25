// ChatContainer.js

import { LitElement, html, css } from './node_modules/lit/index.js';


export class ChatContainer extends LitElement {
  static styles = css`
    // Add your styles here
    .chat-container {
      // Styles for chat-container
    }
    .chat-box {
      // Styles for chat-box
    }
    // ... Add any other styles needed
  `;

  static properties = {
    charCount: { type: Number, attribute: false },
    finalTranscript: { type: String, attribute: false },
    isManuallyStopped: { type: Boolean, attribute: false }
  };

  constructor() {
    super();
    this.charCount = 0;
    this.finalTranscript = '';
    this.isManuallyStopped = false;

    // Initialize other properties as required
  }

  connectedCallback() {
    super.connectedCallback();
    // Add other logic as needed
  }

  disconnectedCallback() {
    // Clean up any resources or listeners
    super.disconnectedCallback();
  }

  handleClear() {
    this.finalTranscript = '';
    this.shadowRoot.getElementById('user-input').value = '';
    this.countCharacters();
  }

  handleDictation() {
    const dictateButton = this.shadowRoot.getElementById('dictate-btn');
    if (dictateButton.textContent === "Record") {
        // Assuming 'recognition' is an instance of SpeechRecognition
        recognition.start();
    } else {
        this.isManuallyStopped = true;
        recognition.stop();
    }
  }

  countCharacters() {
    const userInput = this.shadowRoot.getElementById('user-input').value;
    this.charCount = userInput.length;
  }

  handleSubmission(e) {
    e.preventDefault();
    const userInput = this.shadowRoot.getElementById('user-input');
    const chatContainer = this.shadowRoot.querySelector('.chat-container');
    const chatForm = this.shadowRoot.getElementById('chat-form');
    this.submitChat(userInput, chatContainer, chatForm);
  }

  async submitChat(userInput, chatContainer, chatForm) {
    // Similar to handleChatSubmission
    const userMessage = userInput.value.trim();

    if (userMessage === "") return;

    this.renderChatMessage("user-message", userMessage, chatContainer, chatForm);

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const botResponse = data.message;

        this.renderChatMessage("bot-message", botResponse, chatContainer, chatForm);
    } catch (error) {
        console.error(error);
    }

    userInput.value = "";
    this.charCount = 0;
  }

  renderChatMessage(className, messageContent, chatContainer, chatForm) {
    const chatBox = document.createElement("div");
    chatBox.className = `chat-box ${className}`;
    chatBox.innerHTML = `<span class="message-content">${messageContent}</span>`;
    chatContainer.insertBefore(chatBox, chatForm);
  }

  render() {
    return html`
      <div class="chat-container">
          <h2>Doc-in-a-box</h2>
          <div class="chat-box user-message">
              <span class="message-content">Enter a message to start the conversation.</span>
          </div>
          <form id="chat-form" @submit="${this.handleSubmission}">
              <input type="text" id="user-input" @input="${this.countCharacters}" autocomplete="off" placeholder="Type your message..." required>
              <button type="button" id="clear-btn" @click="${this.handleClear}">Clear</button>
              <button type="button" id="dictate-btn" @click="${this.handleDictation}">Record</button>
              <input type="submit" value="Send">
          </form>
          <p>Character Count: <span id="char-count">${this.charCount}</span> / 244</p>
      </div>
    `;
  }
}

customElements.define('chat-container', ChatContainer);
