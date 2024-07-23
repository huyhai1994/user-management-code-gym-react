import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../Common/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";

/**
 * UserList component fetches and displays a list of users.
 * It also provides functionality to delete a user with a confirmation dialog.
 *
 * @returns {JSX.Element} The rendered component.
 */
function UserList() {
    const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setLoadData] = useState(false);

    /**
     * Displays a notification with a confirmation dialog for deleting a user.
     *
     * @param {number} id - The ID of the user to be deleted.
     * @param {string} name - The name of the user to be deleted.
     * @returns {void}
     */
    const notify = (id, name) => {
        setIsNotificationActive(true)
        toast.info(<ConfirmDialog id={id} name={name} onConfirm={handleDeleteUser} onCancel={() => {
        }}/>, {
            autoClose: true, closeOnClick: true, onClose: () => setIsNotificationActive(false), position: "top-right"
        });
    };

    /**
     * Fetches the list of users from the API when the component mounts or loadData changes.
     *
     * @returns {void}
     */
    useEffect(() => {
        axios.get(API_URL).then(response => {
            setUsers(response.data);
            setIsLoading(false);
        })
    }, [loadData])

    /**
     * Handles the deletion of a user by making an API call to delete the user
     * and updating the state to reflect the changes.
     *
     * @param {string} id - The unique identifier of the user to be deleted.
     * @returns {void} This function does not return a value.
     */
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

    return (
        <div>
            <h1 className='text-center'>User List</h1>
            <Link to={"/admin/users/create"}>
                <button className={"btn btn-success"}>
                    User add
                </button>
            </Link>
            {/* List user here */}
            <div className="container-fluid">
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="3">
                                <Loading/>
                            </td>
                        </tr>
                    ) : users.map((user, index) => (
                        <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => {
                                    console.log(user.id);
                                    notify(user.id, user.name);
                                }} className="btn btn-danger"
                                        disabled={isNotificationActive}
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default UserList;