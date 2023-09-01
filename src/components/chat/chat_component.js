import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, List, Box } from '@mui/material';
import SyncLoader from 'react-spinners/SyncLoader'; // Asegúrate de importar esto
import ChatBubble from './chat_bubble';
import sendMessageToIA from '../../_mock/chat_ia';

const ChatComponent = ({ storedContent, contentTitle }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([
            { text: `Bienvenido al asistente virtual para entender mejor el contenido de ${contentTitle}`, isReceived: true }
        ]);
    }, []);

    useEffect(() => {
        if (inputValue.trim() === '') {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [inputValue]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return; // No permite campos vacíos
        setIsLoading(true);
        setIsButtonDisabled(true); // Deshabilita el botón
        setMessages(prevMessages => [...prevMessages, { text: inputValue, isReceived: false }]);
        try {
            const generatedContent = await sendMessageToIA(storedContent, inputValue, contentTitle);
            setMessages(prevMessages => [...prevMessages, { text: generatedContent, isReceived: true }]);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
        setInputValue('');
        setIsButtonDisabled(false); // Habilita el botón
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
                    disabled={isLoading} // Deshabilita el campo de texto si está cargando
                />
                <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    style={{
                        marginLeft: '10px',
                        backgroundColor: '#1976d2',
                    }}
                    disabled={isButtonDisabled || isLoading} // Deshabilita el botón si no se ha ingresado texto o está cargando
                >
                    Enviar
                </Button>
            </div>
        </div>
    );
};

export default ChatComponent;
