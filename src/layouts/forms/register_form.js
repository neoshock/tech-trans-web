import React, { useState } from 'react';
import { TextField, Stack, IconButton, InputAdornment, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';

const ROLES = [
    {
        id: 2,
        name: 'Estudiante',
    },
    {
        id: 1,
        name: 'Docente',
    },
];

export default function RegisterForm({ handleRegister }) {
    const [student, setStudent] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(ROLES[0]);

    const validate = () => {
        const tempErrors = {};

        if (!student.firstName) tempErrors.firstName = 'El nombre es obligatorio';
        if (!student.lastName) tempErrors.lastName = 'El apellido es obligatorio';
        if (!student.email) tempErrors.email = 'El email es obligatorio';
        if (!student.password) tempErrors.password = 'La contraseña es obligatoria';

        setErrors(tempErrors);

        // Devuelve verdadero si no se encontraron errores
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            student.roleId =
                formData && typeof formData !== "string" ?
                    formData.id : formData;
            const result = await handleRegister(student);
            if (result.statusCode === 200) {
                setStudent({ firstName: '', lastName: '', email: '', password: '' });
                setFormData(ROLES[0]);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={student.firstName}
                onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
            />
            <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                margin="normal"
                value={student.lastName}
                onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                error={Boolean(errors.email)}
                helperText={errors.email}
            />
            <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={student.password}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setStudent({ ...student, password: e.target.value })}
                error={Boolean(errors.password)}
                helperText={errors.password}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
            <Select
                label="Soy"
                name="id"
                value={formData.id
                    || 'Que desea ser?'}
                onChange={handleSelectChange}
                fullWidth
            >
                <MenuItem value={0} disabled>
                    <em>Seleccione su dedicacion</em>
                </MenuItem>
                {ROLES.map((role, index) => (
                    <MenuItem key={index} value={role.id}>
                        {role.name}
                    </MenuItem>
                ))}
            </Select>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                style={{ backgroundColor: '#1C9CEA', color: '#fff' }}
            >
                Registrarse
            </LoadingButton>
        </form>
    );
}
