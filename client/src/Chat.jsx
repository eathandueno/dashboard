import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import './Chat.css';

function ChatContainer() {
    const [charCount, setCharCount] = useState(0);
    const [messages, setMessages] = useState([
        { type: "user-message", content: "Enter a message to start the conversation." }
    ]);
    const [userInputValue, setUserInputValue] = useState('');

    const { transcript, resetTranscript, listening, startListening, stopListening } = useSpeechRecognition();

    const userInputRef = useRef(null);
    const dictateButtonRef = useRef(null);
    const chatContainerRef = useRef(null);
    const chatFormRef = useRef(null);

    useEffect(() => {
        setUserInputValue(transcript);
        setCharCount(transcript.length);
    }, [transcript]);

    async function handleChatSubmission(e) {
        e.preventDefault();
        const userMessage = userInputRef.current.value.trim();

        if (userMessage === "") return;

        renderChatMessage("user-message", userMessage);

        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            const botResponse = data.message;

            renderChatMessage("bot-message", botResponse);
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        } catch (error) {
            console.error(error);
        }

        userInputRef.current.value = "";
        setCharCount(0);
    }

    function renderChatMessage(className, messageContent) {
        setMessages(prevMessages => [...prevMessages, { type: className, content: messageContent }]);
    }

    const handleDictation = () => {
        if (!listening) {
            SpeechRecognition.startListening({continuous:true});
            dictateButtonRef.current.textContent = "Stop";
        } else {
            SpeechRecognition.stopListening();
            dictateButtonRef.current.textContent = "Record";
            setUserInputValue(transcript);
            setCharCount(transcript.length);
        }
    };

    const handleClear = () => {
        setUserInputValue('');
        resetTranscript();
        setCharCount(0);
    };

    return (
        <div className="chat-container" ref={chatContainerRef}>
            <h2>Doc-in-a-box</h2>
            {messages.map((message, index) => (
                <div key={index} className={`chat-box ${message.type}`}>
                    <span className="message-content">{message.content}</span>
                </div>
            ))}
            <form id="chat-form" ref={chatFormRef} onSubmit={handleChatSubmission}>
                <input 
                    type="text" 
                    id="user-input" 
                    ref={userInputRef}
                    value={userInputValue}
                    onChange={(e) => {
                        setUserInputValue(e.target.value);
                        setCharCount(e.target.value.length);
                    }}
                    autoComplete="off" 
                    placeholder="Type your message..." 
                    required 
                />
                <button type="button" id="clear-btn" onClick={handleClear}>Clear</button>
                <button type="button" id="dictate-btn" ref={dictateButtonRef} onClick={handleDictation}>Record</button>
                <input type="submit" value="Send" />
            </form>
            <p>Character Count: {charCount} / 244</p>
        </div>
    );
}

export default ChatContainer;
