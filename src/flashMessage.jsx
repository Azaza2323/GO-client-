import React, { createContext, useContext, useState } from 'react';
import "./index.css"
const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showFlashMessage = (msg, type = 'success') => {
        setMessage(msg);
        setType(type);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            setMessage('');
            setType('');
        }, 5000);
    };

    return (
        <FlashMessageContext.Provider value={{ message, type, isVisible, showFlashMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};