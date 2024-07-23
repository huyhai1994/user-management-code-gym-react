import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserList() {

    const notify = (id) => {
        toast.info("Are you sure?", {
            position: toast.POSITION.TOP_CENTER, autoClose: false, closeOnClick: false, onClose: () => {
                // Handle close
            }, buttons: [{
                label: 'Yes', onClick: () => {
                    alert('Confirmed');
                    handleDeleteUser(id)
                }
            }, {
                label: 'No', onClick: () => alert('Cancelled')
            }]
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
    })

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            setIsLoading(true)
            axios.delete(API_URL + id).then(res => {
                setLoadData(!loadData)
                setIsLoading(false);
                toast.success("Delete success!", {
                    autoClose: 1000,
                })
            })
        }
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
                            <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Delete
                            </button>
                        </td>
                    </tr>))}

                    </tbody>

                </table>
            </div>
        </div>
    </div>)
}

export default UserList;