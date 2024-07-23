import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required")
})

function UserAdd() {
    /*TODO: Khi dang ki nguoi dung moi thanh cong
    *       thi trang se chuyen sang trang
    *       danh sach users*/
    const navigate = useNavigate();
    const registerForm = useFormik({
        initialValues: {
            name: '', email: '', password: '',
        }, validationSchema: registerSchema, onSubmit: (values) => {

        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        /*TODO: Call API to add new user like login*/

        navigate("/admin/users");
    }

    return (

        <div className='container mt-5 '>
            <h1 className='text-center'>Add new user</h1>
            <form className='border p-3 rounded-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="email" className="form-control" id="exampleInputName" aria-describedby="nameHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>)
}

export default UserAdd;