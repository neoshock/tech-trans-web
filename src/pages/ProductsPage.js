import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import {fetchAndPrepareProducts} from '../_mock/products';

import SubjectForm from '../layouts/forms/subjects_forms';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // Estado para almacenar productos

  useEffect(() => {
    // Función IIFE para manejar la operación asincrónica dentro de useEffect
    (async () => {
      const fetchedProducts = await fetchAndPrepareProducts();
      setProducts(fetchedProducts);
    })();
  }, []); // Dependencia vacía significa que esto se ejecutará solo una vez al montar el componente

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSubjectSubmit = (subject) => {
    console.log("Datos de la materia:", subject);
    // Aquí puedes hacer una llamada a la API para guardar los datos
  };

  return (
    <>
      <Helmet>
        <title>Mis materias</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Mis Materias
          </Typography>

          <Button
            variant="contained"
            style={{ backgroundColor: '#2967FF', color: 'white' }}
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setIsSubjectModalOpen(true)}
          >
            Registrar Materia
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
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
