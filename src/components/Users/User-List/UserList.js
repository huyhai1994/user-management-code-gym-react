import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";

function UserList() {


    const notify = (id) => {
        toast.info(<ConfirmDialog id={id} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: false, closeOnClick: true,
        });
    };
    const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        axios.get(API_URL).then(response => {
            setUsers(response.data);
            setIsLoading(false);
        })
    }, [loadData])

    const handleDeleteUser = (id) => {
        setIsLoading(true)
        axios.delete(API_URL + id).then(res => {
            setLoadData(!loadData)
            setIsLoading(false);
            toast.success("Delete success!", {
                autoClose: 1000,
            })
        })
    }

    return (<div>
        <h1>User List</h1>
        <Link to={"/admin/users/create"}>
            <button className={"btn btn-success"}>
                User add
            </button>
        </Link>
        {/* List user here */}
        <div className="card mt-2">
            <div className="card-header">
                <div className="row">
                    <div className="col-12 col-md-6"> User List</div>
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th></th>
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
                        <td>
                            <button onClick={() => {
                                console.log(user.id);
                                notify(user.id);
                            }} className="btn btn-danger">Delete
                            </button>
                        </td>
                    </tr>))}

                    </tbody>

                </table>
                <ToastContainer/>
            </div>
        </div>
    </div>)
}

export default UserList;