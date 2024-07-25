import {useContext, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserList.css'
import Loading from "../../Common/Loading/Loading";
import UserService from "../../../services/user.service";
import {SearchContext} from "../../../context/SearchContext";
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    IconButton,
    Link,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import UserSearch from "../../Common/Search/UserSearch";
import Tooltip from "@mui/material/Tooltip";

function UserList() {
    const {searchQuery} = useContext(SearchContext);
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10;
    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    const notify = (id, name) => {
        setIsNotificationActive(true);
        toast.info(<ConfirmDialog id={id} name={name} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: true, closeOnClick: true, onClose: () => setIsNotificationActive(false), position: "top-right"
        });
    };

    useEffect(() => {
        if (searchQuery) {
            UserService.findUserByName(searchQuery).then(response => {
                setUsers(response.data);
                setIsLoading(false);
            }).catch(error => {
                setUsers([]);
                setIsLoading(false);
                toast.error('User not found');
            });
        } else {
            UserService.getAllUsers().then(response => {
                const sortUsers = response.data.sort((a, b) => b.id - a.id);
                setUsers(sortUsers);
                setIsLoading(false);
            });
        }
    }, [loadData, searchQuery]);

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

    const handleUserStatusChange = (user, event) => {
        user.active = event.target.checked;
        UserService.updateUser(user.id, user).then(res => {
            setLoadData(!loadData);
            toast.success("Update status success!", {
                autoClose: 1000,
            });
        });

    }


    return (<Container sx={{mt: 2}}>
        {isLoading && (
            <div className="loading-overlay">
                <Loading/>
            </div>
        )}
        <TableContainer className={isLoading && 'blur'} component={Paper}> <Typography variant="h4" align="center"
                                                                                       gutterBottom>User
            List</Typography>
            <UserSearch/>
            <Table>
                {/*TODO: Table Head start*/}
                <TableHead align="center">
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((user, index) => (
                        <TableRow className={`table-row ${user.active ? " " : "inactive-row"}`} key={user.id}>
                            <TableCell>{indexOfFirstUser + index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.dob}</TableCell>
                            <TableCell><FormControlLabel
                                control={<Switch checked={user.active}
                                                 onChange={(e) => handleUserStatusChange(user, e)}/>}
                                label={user.active ? "Active" : "Disable"}/></TableCell>
                            <TableCell className=' table-row-actions'>
                                <Tooltip title="Delete">
                                    {/*TODO: 23/07/2024 -> can xem lai mui de biet
                                        tai sao ko hien helper len duoc */}
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
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton
                                        color="primary"
                                        component={Link}
                                        to={`/admin/users/${user.id}/edit`}
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
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