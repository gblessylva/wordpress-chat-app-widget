import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

const ChatBot = ({ message }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

    useEffect(() => {
        // Load messages from local storage on component mount
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(storedMessages);
    }, []);

    const saveMessagesToLocalStorage = (newMessages) => {
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
    };

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const sendMessage = () => {
        if (inputMessage.trim() === '') {
            return;
        }

        const newMessage = { author: 'user', content: inputMessage };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        saveMessagesToLocalStorage(newMessages);
        setInputMessage('');

        // Simulate bot response (for demo purposes)
        setTimeout(() => {
            const botResponse = { author: 'bot', content: `Bot response to: ${inputMessage}` };
            const updatedMessages = [...newMessages, botResponse];
            setMessages(updatedMessages);
            saveMessagesToLocalStorage(updatedMessages);
        }, 500); // Simulate delay
    };

    const toggleHeaderSize = () => {
        setIsHeaderExpanded(!isHeaderExpanded);
    };

    const containerStyle = {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: '9999',
        width: '300px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    };

    const smallHeaderStyle = {
        backgroundColor: '#9b51e0',
        color: '#ffffff',
        padding: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px', // Small header height
    };

    const bigHeaderStyle = {
        backgroundColor: '#9b51e0',
        color: '#ffffff',
        padding: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px', // Big header height
    };

    const chatBoxStyle = {
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '10px',
    };

    const inputContainerStyle = {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #e0e0e0',
    };

    const inputStyle = {
        flex: '1',
        marginRight: '10px',
        padding: '8px',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        outline: 'none',
    };

    const buttonStyle = {
        padding: '8px 16px',
        backgroundColor: '#9b51e0',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
    };

    return (
        <div id="ai-chat-bot" style={ containerStyle }>
            <div
                id="ai-chat-bot-header"
                style={ isHeaderExpanded ? bigHeaderStyle : smallHeaderStyle }
                onClick={ toggleHeaderSize }
            >
                { isHeaderExpanded ? (
                    <span>{ __( 'Chat Bot', 'ai-chat-bot' ) }</span>
                ) : (
                    <span role="img" aria-label="Chat Icon">💬</span>
                ) }
            </div>
            <div id="ai-chat-bot-body" style={ chatBoxStyle }>
                {messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px', textAlign: msg.author === 'bot' ? 'left' : 'right' }}>
                        <strong>{msg.author === 'bot' ? 'Bot' : 'You'}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div id="ai-chat-bot-input" style={ inputContainerStyle }>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder={__('Type your message...', 'ai-chat-bot')}
                    style={inputStyle}
                />
                <button onClick={sendMessage} style={buttonStyle}>
                    {__('Send', 'ai-chat-bot')}
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
