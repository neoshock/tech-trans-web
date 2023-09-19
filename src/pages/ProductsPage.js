import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

// @mui
import { Container, Stack, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import { fetchAndPrepareProducts, createSubject, createSubjectByStudent } from '../_mock/products';

import SubjectForm from '../layouts/forms/subjects_forms';

// ----------------------------------------------------------------------

import AlertDialog from '../components/dialogs/alert_dialog';
import SuccessDialog from '../components/dialogs/success_dialog';
import { getRole } from '../_mock/auth_service';

// ----------------------------------------------------------------------

const JoinSubjectForm = ({ isOpen = true, onClose, handleJoin }) => {
  const [code, setCode] = useState('');

  const handleJoinSubject = () => {
    handleJoin(code);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Unirse a materia</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              fullWidth
              label="Código de materia"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleJoinSubject}>Unirse</Button>
      </DialogActions>
    </Dialog>
  );
}


export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // Estado para almacenar productos
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const userRole = getRole(); // Obtener el rol del usuario
  // insert logic for join form dialog
  const [openJoinForm, setOpenJoinForm] = useState(false);

  useEffect(() => {
    // Función IIFE para manejar la operación asincrónica dentro de useEffect
    (async () => {
      const fetchedProducts = await fetchAndPrepareProducts();
      setProducts(fetchedProducts);
    })();
  }, []); // Dependencia vacía significa que esto se ejecutará solo una vez al montar el componente


  const handleSubjectSubmit = async (subject) => {
    // Aquí puedes hacer una llamada a la API para guardar los datos
    const newSubject = await createSubject(subject);
    if (newSubject.statusCode === 200) {
      setTitle('Materia registrada');
      setMessage('La materia se ha registrado correctamente');
      setOpenSuccessAlert(true);
      setIsSubjectModalOpen(false);
      const fetchedProducts = await fetchAndPrepareProducts();
      setProducts(fetchedProducts);
    } else {
      setTitle('Error al registrar materia');
      setMessage('Ocurrió un error al registrar la materia');
      setIsDialogOpen(true);
    }
  };

  const handleJoinSubject = async (code) => {
    // Aquí puedes hacer una llamada a la API para guardar los datos
    const newSubject = await createSubjectByStudent(code);
    if (newSubject.statusCode === 200) {
      setTitle('Materia vinculada');
      setMessage('La materia se ha vinculado correctamente');
      setOpenSuccessAlert(true);
      setOpenJoinForm(false);
      const fetchedProducts = await fetchAndPrepareProducts();
      setProducts(fetchedProducts);
    } else {
      setTitle('Error al vincular materia');
      setMessage('Ocurrió un error al vincular la materia');
      setIsDialogOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setOpenSuccessAlert(false);
  };


  return (
    <>
      <AlertDialog title={title} message={message} isOpen={isDialogOpen} onClose={handleCloseDialog} />
      <SuccessDialog title={title} message={message} isOpen={openSuccessAlert} onClose={handleCloseDialog} />
      <JoinSubjectForm isOpen={openJoinForm} onClose={() => setOpenJoinForm(false)} handleJoin={handleJoinSubject} />

      <Helmet>
        <title>Mis materias</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Mis Materias
          </Typography>
          {
            userRole === 'teacher' && (
              <Button
                variant="contained"
                style={{ backgroundColor: '#2967FF', color: 'white' }}
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setIsSubjectModalOpen(true)}
              >
                Registrar Materia
              </Button>)
          } {
            userRole === 'student' && (
              <Button
                variant="contained"
                style={{ backgroundColor: '#2967FF', color: 'white' }}
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setOpenJoinForm(true)}
              >
                Vincular Materia
              </Button>)
          }
        </Stack>


        {
          products.length !== 0 ?
            <ProductList products={products} />
            : <>
              <Typography variant="h5" sx={{ mb: 5 }}>
                No tienes materias registradas
              </Typography>
            </>
        }

        {/* <ProductCartWidget /> */}
      </Container>
      <SubjectForm
        open={isSubjectModalOpen}
        handleClose={() => setIsSubjectModalOpen(false)}
        handleSubmit={handleSubjectSubmit}
      />
    </>
  );
}
