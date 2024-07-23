import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './UserList.css'
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function UserList() {
    const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const notify = (id, name) => {
        setIsNotificationActive(true)
        toast.info(<ConfirmDialog id={id} name={name} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: true, closeOnClick: true, onClose: () => setIsNotificationActive(false), position: "top-right"
        });
    };
    useEffect(() => {
        axios.get(API_URL).then(response => {
            /*TODO: sort user from newest by Id*/
            const sortUsers = response.data.sort((a, b) => b.id - a.id);
            setUsers(sortUsers);
            setIsLoading(false);
        })
    }, [loadData])

    const handleDeleteUser = (id) => {
        setIsLoading(true)
        setIsNotificationActive(true)
        axios.delete(API_URL + id).then(res => {
            setLoadData(!loadData)
            setIsLoading(false);
            toast.success("Delete success!", {
                autoClose: 1000,
            })
        })
    }
    /*TODO: indexing for sorting and paging*/
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (<div>


        {/* List user here */}
        <div className="container user-list">
            <h1 className='text-center'>User List</h1>
            <div className="row">
                <div className="col d-flex justify-content-end">
                    <Link to={"/admin/users/create"}>
                        <button className={"btn btn-success"}>
                            <PersonAddIcon/>
                        </button>
                    </Link>
                    <div/>
                </div>
            </div>
            <table className="table table-responsive text-center">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (<tr>
                    <td colSpan="3">
                        <Loading/>
                    </td>
                </tr>) : users.map((user, index) => (<tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1} < /th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='my-4'>
                        <button onClick={() => {
                            console.log(user.id);
                            notify(user.id, user.name);
                        }} className="btn btn-outline-danger mx-1"
                                disabled={isNotificationActive}
                        ><DeleteIcon/>
                        </button>
                        <button className="btn btn-outline-primary mx-1">
                            <Link to={`/admin/users/${user.id}/edit`}
                                  style={{color: 'inherit', textDecoration: 'inherit'}}>
                                <EditIcon/>
                            </Link>
                        </button>
                    </td>
                </tr>))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <ToastContainer/>
        </div>
    </div>)
}

export default UserList;