import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../../../Services/user.service";
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

function UserList() {
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10;

    const notify = (id, name) => {
        setIsNotificationActive(true);
        toast.info(<ConfirmDialog id={id} name={name} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: true, closeOnClick: true, onClose: () => setIsNotificationActive(false), position: "top-right"
        });
    };

    useEffect(() => {
        UserService.getAllUsers().then(response => {
            const sortUsers = response.data.sort((a, b) => b.id - a.id);
            setUsers(sortUsers);
            setIsLoading(false);
        });
    }, [loadData]);

    const handleDeleteUser = (id) => {
        setIsLoading(true);
        setIsNotificationActive(true);
        UserService.deleteUser(id).then(res => {
            setLoadData(!loadData);
            setIsLoading(false);
            toast.success("Delete success!", {
                autoClose: 1000,
            });
        });
    };

    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    return (<Container>
        <TableContainer component={Paper}> <Typography variant="h4" align="center" gutterBottom>User List</Typography>
            <Table>
                <TableHead align="center">
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (<TableRow>
                        <TableCell colSpan={4}>
                            <Loading/>
                        </TableCell>
                    </TableRow>) : currentUsers.map((user, index) => (<TableRow key={user.id}>
                        <TableCell>{indexOfFirstUser + index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <IconButton
                                color="error"
                                onClick={() => {
                                    console.log(user.id);
                                    notify(user.id, user.name);
                                }}
                                disabled={isNotificationActive}
                            >
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton
                                color="primary"
                                component={Link}
                                to={`/admin/users/${user.id}/edit`}
                            >
                                <EditIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={3}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                startIcon={<NavigateBeforeIcon/>}
                sx={{mr: 2}} // Add margin-right to the first button
            >
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                endIcon={<NavigateNextIcon/>}
            >
            </Button>
        </Box>
        <ToastContainer/>
    </Container>);
}

export default UserList;