import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatBubble = ({ message, isReceived }) => {
  return (
    <Box
      sx={{
        maxWidth: '75%',
        borderRadius: '16px',
        padding: '12px',
        marginBottom: '8px',
        marginLeft: isReceived ? '0px' : 'auto',
        marginRight: isReceived ? 'auto' : '0px',
        backgroundColor: isReceived ? 'grey.300' : 'primary.main',
        color: isReceived ? 'black' : 'white',
      }}
    >
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

export default ChatBubble;
