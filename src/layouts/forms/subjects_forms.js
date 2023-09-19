import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const SubjectForm = ({ open, handleClose, handleSubmit }) => {
    const [description, setDescription] = useState('');
    const [completedHours, setCompletedHours] = useState(0);
    const [subjectName, setSubjectName] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const tempErrors = {};

        if (!description) tempErrors.description = 'La descripción es obligatoria';
        if (!completedHours) tempErrors.completedHours = 'Las horas completadas son obligatorias';
        if (!subjectName) tempErrors.subjectName = 'El nombre de la materia es obligatorio';

        setErrors(tempErrors);

        // Devuelve verdadero si no se encontraron errores
        return Object.keys(tempErrors).length === 0;
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const subject = {
                description,
                completedHours,
                subjectName,
            };
            await handleSubmit(subject);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Registrar Materia</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombre de la Materia"
                    fullWidth
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    error={Boolean(errors.subjectName)}
                    helperText={errors.subjectName}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                />
                <TextField
                    margin="dense"
                    label="Horas Completadas"
                    fullWidth
                    type="number"
                    value={completedHours}
                    onChange={(e) => setCompletedHours(e.target.value)}
                    error={Boolean(errors.completedHours)}
                    helperText={errors.completedHours}
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
