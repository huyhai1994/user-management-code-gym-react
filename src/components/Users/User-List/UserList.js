import {Link} from "react-router-dom";

function UserList() {
    return (
        <div>
            <h1>User List</h1>
            <Link to={"/admin/users/create"}>
                <button className={"btn btn-success"}>
                    User add
                </button>
            </Link>
        </div>
    )
}

export default UserList;