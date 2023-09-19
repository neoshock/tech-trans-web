import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import {
    Container, Stack,
    Typography, Button, Card, styled, Box, Grid,
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar
} from '@mui/material';
import Iconify from '../components/iconify';
// components

// mock
import { fetchAndPrepareProductsById } from '../_mock/products';
import { getUsersBySubject, addUserToSubject } from '../_mock/user_service';
import AddStudenForm from '../layouts/forms/add_student_form';
// ----------------------------------------------------------------------

const StyleCardCover = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 1 / 4)',
});

const TABLE_HEAD = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'company', label: 'Apellido', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
];

export default function SubjectDetailPage() {
    const { subjectId } = useParams();
    const [product, setProduct] = useState({});
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(null);


    useEffect(() => {
        // Función IIFE para manejar la operación asincrónica dentro de useEffect
        (async () => {
            const fetchedProduct = await fetchAndPrepareProductsById(subjectId);
            setProduct(fetchedProduct);
        })();
    }, []);

    useEffect(() => {
        // Función IIFE para manejar la operación asincrónica dentro de useEffect
        (async () => {
            const fetchedUsers = await getUsersBySubject(subjectId);
            setUsers(fetchedUsers);
        })();
    }, []);

    const handleSubmit = async (studentId) => {
        await addUserToSubject(subjectId, studentId);
        const fetchedUsers = await getUsersBySubject(subjectId);
        setUsers(fetchedUsers);
        return true;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Card
                sx={{
                    margin: '2%'
                }}
            >
                <StyleCardCover
                    sx={{
                        pt: 'calc(60% * 1 / 3)',
                        backgroundImage: `url(${product.cover})`,
                        backgroundSize: 'cover',
                        opacity: '0.1',
                        backgroundPosition: 'center',
                        backgroundColor:
                            (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[500]
                                    : theme.palette.grey[900],
                        position: 'relative',
                        '&:after': {
                            top: 0,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        },
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '15%',
                        left: '6%',
                        width: '86%'
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                Materia: {product.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Descripcion: {product.description}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Profesor: {product.teacherName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Cantidad de estudiantes: {users.length}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Total de Horas: {product.completedHours}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
            {/* Product detail */}
            <Container sx={{
                padding: '0 3%'
            }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Estudiantes de la Materia
                    </Typography>
                    <Button variant="contained" style={
                        { backgroundColor: '#2967FF', color: 'white' }}
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Agregar Estudiante
                    </Button>
                </Stack>

                <Card>
                    <Box sx={{ minWidth: 800 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {TABLE_HEAD.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={headCell.alignRight ? 'right' : 'left'}
                                            >
                                                {headCell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                {/* Checkbox, nombre, apellido, email */}
                                <TableBody>
                                    {users.map((row) => {
                                        const { studentId, firtsName, lastName, email } = row;
                                        const selectedUser = selected.indexOf(firtsName) !== -1;
                                        return (
                                            <TableRow hover key={studentId} tabIndex={-1} role="checkbox" selected={selectedUser}>

                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={firtsName} src='/assets/images/avatars/avatar_2.jpg' />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {firtsName}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{lastName}</TableCell>

                                                <TableCell align="left">{email}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[10, 15, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </Card>
            </Container>
            <AddStudenForm
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                handleSubmit= {handleSubmit}
                subjectId={subjectId}
            />
        </>
    );
}
