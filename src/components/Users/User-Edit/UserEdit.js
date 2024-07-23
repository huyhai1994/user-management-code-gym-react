import {useParams} from "react-router-dom";

function UserEdit() {
    const {id} = useParams();

    return (
        <div>
            <h1>Edit user: {id}</h1>
        </div>
    )
}

export default UserEdit;