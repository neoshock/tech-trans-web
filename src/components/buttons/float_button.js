// FloatingButton.js
import React from 'react';
import Fab from '@mui/material/Fab';
import Iconify from '../iconify';

const FloatingButton = ({ onClick }) => {
    return (
        <Fab
            color="secondary"
            aria-label="add"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#1976d2'
            }}
            onClick={onClick}
        >
            <Iconify icon="eva:message-square-outline" />
        </Fab>
    );
};

export default FloatingButton;
