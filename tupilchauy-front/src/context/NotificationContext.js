import { useState, createContext, useCallback } from "react";

const NotificationContext = createContext()

export default NotificationContext

export const NotificacionProvider = ({ children }) => {
    const [messages, setMessage] = useState([])
    const [type, setType] = useState('ok')

    const showNotification = useCallback(
        function (message, type) {
            setMessage((messages) => [...messages, message]);
            setType(type)
            setTimeout(() => setMessage((messages) => messages.slice(1)), 2000);
        }, [setMessage]
    )

    const notificationContainer = {
        position: 'absolute',
        top: 80,
        right: 50,
        width: 'auto',
        height: 'auto'
    }

    let backgroundColor

    switch (type) {
        case 'error':
            backgroundColor = '#AD2222'
            break
        case 'ok':
            backgroundColor = '#10612B'
            break
        default:
            backgroundColor = '#10612B'
    }

    const notification = {
        position: 'relative',
        marginTop: '20px',
        width: 'auto',
        height: 'auto',
        color: 'white',
        backgroundColor: backgroundColor,
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px'
    }

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <div style={notificationContainer}>
                {messages.map((currentMessage, index) => {
                    return (
                        <div style={notification} key={index}>
                            {currentMessage}
                        </div>
                    )
                })}
            </div>
        </NotificationContext.Provider>
    )
}