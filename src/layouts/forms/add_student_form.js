import React, { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar, Stack, Typography, Box, Card, IconButton
} from '@mui/material';
import Iconify from '../../components/iconify';
import { UserListToolbar } from '../../sections/@dashboard/user';
import { getUsersNotInSubject } from '../../_mock/user_service';


const TABLE_HEAD = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'company', label: 'Apellido', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    {
        id: 'action',
        label: 'Acción',
        alignRight: false
    }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function AddStudenForm({ open, handleClose, handleSubmit, subjectId }) {

    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('firstName');
    const [order, setOrder] = useState('asc');
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        // Función IIFE para manejar la operación asincrónica dentro de useEffect
        (async () => {
            const fetchedUsers = await getUsersNotInSubject(subjectId);
            console.log(fetchedUsers);
            setUsers(fetchedUsers);
        })();
    }
        , []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

    const handleAddUser = async (studentId) => {
        const result = await handleSubmit(studentId);
        if (result) {
            const fetchedUsers = await getUsersNotInSubject(subjectId);
            console.log(fetchedUsers);
            setUsers(fetchedUsers);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            sx={
                {
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: 0,
                        borderRadius: '15px',
                        maxWidth: '90%',
                        maxHeight: '90%',
                        height: '90%',
                        position: 'relative',
                        overflowY: 'auto',
                        '-webkit-overflow-scrolling': 'touch',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }
            }
        >
            <DialogTitle>{'Agregar Estudiante'}</DialogTitle>
            <DialogContent>
                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
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
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { studentId, firstName, lastName, email } = row;
                                        const selectedUser = selected.indexOf(firstName) !== -1;
                                        return (
                                            <TableRow hover key={studentId} tabIndex={-1} role="checkbox" selected={selectedUser}>

                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={firstName} src='/assets/images/avatars/avatar_2.jpg' />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {firstName}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{lastName}</TableCell>

                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton size="large" color="primary"
                                                        onClick={() => handleAddUser(studentId)}
                                                    >
                                                        <Iconify icon={'eva:plus-circle-outline'} />
                                                    </IconButton>
                                                </TableCell>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
