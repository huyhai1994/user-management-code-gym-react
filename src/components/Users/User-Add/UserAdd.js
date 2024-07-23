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
            const {name, email, password} = values;
            // TODO: Dang ki nguoi dung moi
            console.log(values);
            alert('User registered successfully');
            registerForm.resetForm();
            navigate("/admin/users");
        }
    })


    return (<div className='container mt-5 '>
        <h1 className='text-center'>Add new user</h1>
        {/*TODO: Form login start here...*/}
        <form className='border p-3 rounded-3' onSubmit={registerForm.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" name="name" onChange={registerForm.handleChange} className="form-control"
                       id="exampleInputName"
                />
                {registerForm.errors.name && (<small className="text-danger">{registerForm.errors.name}</small>)}
            </div>
            {/*TODO: email input start*/}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" onChange={registerForm.handleChange} className="form-control"
                       id="exampleInputEmail1"
                       placeholder="name@example.com"/>
                {registerForm.errors.email && (<small className="text-danger">{registerForm.errors.email}</small>)}
            </div>
            {/*TODO: password input*/}
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                       onChange={registerForm.handleChange}/>
                {registerForm.errors.password && (
                    <small className="text-danger">{registerForm.errors.password}</small>)}
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>)
}

export default UserAdd;