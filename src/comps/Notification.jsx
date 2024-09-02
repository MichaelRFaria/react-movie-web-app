import React from 'react';
import '../css/Notification.css';

const Notification = ({ message, isVisible }) => {
    return (
        <div className={`notification ${isVisible ? 'show' : ''}`}>
            {message}
        </div>
    );
};

export default Notification;