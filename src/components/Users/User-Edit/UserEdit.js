import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useEffect, useState} from "react";
import Loading from "../../Common/Loading/Loading";
import {toast} from "react-toastify";

const editSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required"), name: Yup.string().required("Name is required")
});
const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';

function UserEdit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState(null);

    const editForm = useFormik({
        initialValues: {
            name: '', email: '',
        }, validationSchema: editSchema, onSubmit: (values) => {
            axios.put(`${API_URL}/${id}`, values).then(response => {
                toast.success('User updated successfully', {})
                editForm.resetForm();
                navigate("/admin/users");
            })
        }
    });

    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then(response => {
                setUser(response.data);
                editForm.setValues({
                    name: response.data.name, email: response.data.email
                });
            })
            .catch(error => {
                console.error('Error fetching user: ', error);
            });
    }, [id]);

    if (!user) {
        return <div><Loading/>
        </div>;
    }

    return (<div className='container mt-5 '>
        <h1 className='text-center'>Edit user</h1>
        <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" value={editForm.values.name} name="name" onChange={editForm.handleChange}
                       className="form-control"
                       id="exampleInputName"
                />
                {editForm.errors.name && (<small className="text-danger">{editForm.errors.name}</small>)}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={editForm.values.email} name="email"
                       onChange={editForm.handleChange}
                       className="form-control"
                       id="exampleInputEmail1"
                       placeholder="name@example.com"/>
                {editForm.errors.email && (<small className="text-danger">{editForm.errors.email}</small>)}
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>);
}

export default UserEdit;