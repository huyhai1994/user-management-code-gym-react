import "./Login.css";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setUserLogin} from "../../redux/features/authSlice";

/**
 * Validation schema for the login form using Yup.
 */
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"), password: Yup.string()
        .required("Password is required"),
});

/**
 * Login component handles the user login functionality.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginForm = useFormik({
        initialValues: {
            email: "", password: "", rememberMe: false,
        }, validationSchema: loginSchema, onSubmit: (values) => {
            const {email, password} = values;
            // Handle login logic
            if (email === "admin@gmail.com" && password === "1234") {
                let user = {
                    email: email, password: password
                }
                /*TODO: goi dispatch*/
                dispatch(setUserLogin(user));
                // Navigate to the admin users page
                navigate("/admin/users");
            } else {
                alert("Invalid email or password");
                return; // Stop form submission
            }
        }
    });

    return (<>
        <div className="container d-flex justify-content-center">
            <div className="form-signin text-center mt-5">
                <form onSubmit={loginForm.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                        <input
                            type="email"
                            name="email"
                            onChange={loginForm.handleChange}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Email address</label>
                        {loginForm.errors.email ? (
                            <small className="text-danger">{loginForm.errors.email}</small>) : null}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            name="password"
                            onChange={loginForm.handleChange}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                onChange={loginForm.handleChange}
                                value="remember-me"
                            /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <Link to="/register">
                        <small>Register</small>
                    </Link>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </div>
        </div>
    </>);
}

export default Login;