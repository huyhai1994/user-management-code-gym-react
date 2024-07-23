import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";

const editSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required")
});
const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';

function UserEdit() {
    const navigate = useNavigate();
    const {id} = useParams();

    const editForm = useFormik({
        initialValues: {
            name: '', email: '', password: '',
        }, validationSchema: editSchema, onSubmit: (values) => {
            axios.put(`${API_URL}/${id}`, values).then(response => {
                console.log(values);
                alert('User updated successfully');
                editForm.resetForm();
                navigate("/admin/users");
            })
        }
    });

    return (<div className='container mt-5 '>
        <h1 className='text-center'>Edit user</h1>
        <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" name="name" onChange={editForm.handleChange} className="form-control"
                       id="exampleInputName"
                />
                {editForm.errors.name && (<small className="text-danger">{editForm.errors.name}</small>)}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" onChange={editForm.handleChange} className="form-control"
                       id="exampleInputEmail1"
                       placeholder="name@example.com"/>
                {editForm.errors.email && (<small className="text-danger">{editForm.errors.email}</small>)}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                       onChange={editForm.handleChange}/>
                {editForm.errors.password && (<small className="text-danger">{editForm.errors.password}</small>)}
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>)
}

export default UserEdit;