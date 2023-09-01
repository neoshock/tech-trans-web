import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, List, Box } from '@mui/material';
import SyncLoader from 'react-spinners/SyncLoader'; // Asegúrate de importar esto
import ChatBubble from './chat_bubble';
import sendMessageToIA from '../../_mock/chat_ia';

const ChatComponent = ({ storedContent, contentTitle }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([
            { text: `Bienvenido al asistente virtual para entender mejor el contenido de ${contentTitle}`, isReceived: true }
        ]);
    }, []);

    const handleSendMessage = async () => {
        setIsLoading(true);
        setMessages(prevMessages => [...prevMessages, { text: inputValue, isReceived: false }]);
        try {
            const generatedContent = await sendMessageToIA(storedContent, inputValue, contentTitle); 
            setMessages(prevMessages => [...prevMessages, { text: generatedContent, isReceived: true }]);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
        setInputValue('');
        setIsLoading(false);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ padding: '15px' }}>
            <Box
                ref={messagesEndRef}
                style={{
                    height: '360px',
                    maxHeight: '450px',
                    overflowY: 'auto',
                }}
            >
                <List>
                    {messages.map((messageObj, index) => (
                        <ChatBubble
                            key={index}
                            message={messageObj.text}
                            isReceived={messageObj.isReceived}
                        />
                    ))}
                    {isLoading && <SyncLoader 
                        color="#1976d2"
                        loading={isLoading}
                    />}
                </List>
            </Box>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <TextField
                    label="Escribe un mensaje"
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    style={{
                        marginLeft: '10px',
                        backgroundColor: '#1976d2',
                    }}
                >
                    Enviar
                </Button>
            </div>
        </div>
    );
};

export default ChatComponent;
