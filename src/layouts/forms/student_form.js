import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function StudentForm({ open, handleClose, handleSubmit }) {
    const [student, setStudent] = useState({
        email: '',
        NameIdentifier: '',
        Name: '',
        Surname: '',
        rolName: 'student',
        idRol: '2',
        nbf: '',
        exp: '',
        iat: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const onSubmit = () => {
        handleSubmit(student);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{'Crear/Editar Estudiante'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={student.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="NameIdentifier"
                    label="Identificador de Nombre"
                    type="text"
                    fullWidth
                    value={student.NameIdentifier}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="Name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={student.Name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="Surname"
                    label="Apellido"
                    type="text"
                    fullWidth
                    value={student.Surname}
                    onChange={handleChange}
                />
                {/* Aquí puedes agregar otros campos según necesites */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
