import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";

function UserList() {
    const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);
    const notify = (id, name) => {
        setIsNotificationActive(true)
        toast.info(<ConfirmDialog id={id} name={name} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: true, closeOnClick: true, onClose: () => setIsNotificationActive(false), position: "top-right"
        });
    };
    useEffect(() => {
        axios.get(API_URL).then(response => {
            setUsers(response.data);
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

    return (<div>
        <h1 className='text-center'>User List</h1>
        <Link to={"/admin/users/create"}>
            <button className={"btn btn-success"}>
                User add
            </button>
        </Link>
        {/* List user here */}
        <div className="container">
            <table className="table table-responsive">
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
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='my-4'>
                        <button onClick={() => {
                            console.log(user.id);
                            notify(user.id, user.name);
                        }} className="btn w-25 btn-danger"
                                disabled={isNotificationActive}
                        >Delete
                        </button>
                        <button className="btn btn-outline-primary mx-1">
                            <Link to={`/admin/users/${user.id}/edit`}
                                  style={{color: 'inherit', textDecoration: 'inherit'}}>
                                Edit
                            </Link>
                        </button>
                    </td>
                </tr>))}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    </div>)
}

export default UserList;