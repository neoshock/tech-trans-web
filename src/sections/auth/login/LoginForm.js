import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function LoginForm({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = { email: '', password: '' };

    if (!email || !email.includes('@')) {
      isValid = false;
      errors.email = 'Ingrese un email válido.';
    }

    if (!password || password.length < 6) {
      isValid = false;
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleClick = async () => {
    if (validateForm()) {
      const result = await handleLogin(email.toLowerCase(), password);
      // Aquí puedes manejar la navegación o mostrar más mensajes según el resultado
    }
  };

  return (
    <>
      <Stack spacing={3} mb={6}>
        <TextField
          name="email"
          label="Dirección de correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: '#1C9CEA', color: '#fff' }}
      >
        Iniciar sesión
      </LoadingButton>
    </>
  );
}
