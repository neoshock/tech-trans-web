import React, { useState } from 'react';
import { Link as LinkTo, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider } from '@mui/material';
import { RingLoader } from 'react-spinners';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import { LoginForm } from '../sections/auth/login';
import authService from '../_mock/auth_service';
import AlertDialog from '../components/dialogs/alert_dialog';
import SuccessDialog from '../components/dialogs/success_dialog';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const override = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [title, setTitle] = useState();
  const [message, setMessage] = useState();

  const [loading, setLoading] = useState(false); // Cambiado a false porque al principio no estamos cargando
  const [color, setColor] = useState('#3336FF');

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    const result = await authService.login(email, password);
    if (result) {
      setTitle('Inicio de sesion exitoso');
      setMessage('Bienvenido de nuevo');
      setOpenSuccessAlert(true);
      navigate('/dashboard', { replace: true });
    } else {
      setTitle('Inicio de sesion fallido');
      setMessage('Correo electronico o contraseña incorrecto');
      setIsDialogOpen(true);
    }
    setLoading(false);
    return result;
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setOpenSuccessAlert(false);
  };

  return (
    <>
      <div
        style={{
          display: loading ? 'flex' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
        }}
        className="loadingContainer"
      >
        <RingLoader color={color} css={override} loading={loading} size={150} />
      </div>
      <AlertDialog title={title} message={message} isOpen={isDialogOpen} onClose={handleCloseDialog} />
      <SuccessDialog title={title} message={message} isOpen={openSuccessAlert} onClose={handleCloseDialog} />
      <Helmet>
        <title> Iniciar sesión | Tech Trans </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hola, bienvenido de nuevo
            </Typography>
            <img src="https://cdn-icons-png.flaticon.com/512/7749/7749358.png" alt="inicio de sesión" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Iniciar sesión en Tech Trans
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              ¿No tienes una cuenta? {''}
              <Link variant="subtitle2"
                component={LinkTo}
                to="/register"
              >Comenzar</Link>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                O
              </Typography>
            </Divider>
            <LoginForm handleLogin={handleLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
