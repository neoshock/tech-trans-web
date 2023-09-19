import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import Iconify from '../iconify/Iconify';

export default function SuccessDialog({ title = "Atención", message = "Mensaje aquí", isOpen = true, onClose }) {

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Box display="flex" alignItems="center">
                        <Iconify icon="eva:alert-circle-fill"
                            style={{ marginRight: '0.5rem' }}
                            color="#18e77c"
                            width={30}
                        />
                        {title}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
