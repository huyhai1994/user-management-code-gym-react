import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadData, setIsLoadData] = useState(false);
    useEffect(() => {
        axios.get('https://669dd2f69a1bda3680047410.mockapi.io/api/users/').then(
            response => {
                setUsers(response.data);
                setIsLoading(false);
            }
        )
    })

    const handleDeleteUser = (id) => {
        // thuat toan xoa 1 phan tu trong mang theo dieu kien
        if (window.confirm("Are you sure you want to delete")) {
            const newUsers = users.filter(user => user.id !== id)
            setUserFilter(newUsers)
        }
    }

    const handleSearch = (keyword) => {
        const newUsers = keyword ? users.filter(user => user.name.toLowerCase().includes(keyword)) : data
        setUserFilter(newUsers)
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
                    <div className="col-12 col-md-6">
                        <InputSearch search={handleSearch}/>
                    </div>
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
                    {userFilter.map((user, index) => (<tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.id)}
                                    className="btn btn-danger">Delete
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