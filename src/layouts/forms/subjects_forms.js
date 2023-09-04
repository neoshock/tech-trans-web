import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const SubjectForm = ({ open, handleClose, handleSubmit }) => {
    const [description, setDescription] = useState('');
    const [completedHours, setCompletedHours] = useState('');
    const [subjectName, setSubjectName] = useState('');

    const handleSave = () => {
        handleSubmit({
            description,
            completed_hours: completedHours,
            subject_name: subjectName
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Registrar Materia</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Horas Completadas"
                    fullWidth
                    type="number"
                    value={completedHours}
                    onChange={(e) => setCompletedHours(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Nombre de la Materia"
                    fullWidth
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubjectForm;
