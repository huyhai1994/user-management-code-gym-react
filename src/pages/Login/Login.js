import "./Login.css";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setUserLogin} from "../../redux/features/authSlice";
import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from '@mui/material';
import BackGroundImage from "../../assests/HomeImage.jpg";

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

    return (<Container maxWidth="sm" style={{
        position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
        < img
            src={BackGroundImage}
            alt="Back Ground Image"
            className="position-absolute"
            style={{
                left: '50%', top: '50%', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: '-1'
            }}
        />
        <Box className="form-signin" textAlign="center" mt={5}>
            <form onSubmit={loginForm.handleSubmit}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Please sign in
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    type="email"
                    name="email"
                    onChange={loginForm.handleChange}
                    label="Email address"
                    variant="outlined"
                    error={!!loginForm.errors.email}
                    helperText={loginForm.errors.email}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    onChange={loginForm.handleChange}
                    label="Password"
                    variant="outlined"
                    error={!!loginForm.errors.password}
                    helperText={loginForm.errors.password}
                />
                <FormControlLabel
                    control={<Checkbox
                        name="rememberMe"
                        onChange={loginForm.handleChange}
                        color="primary"
                    />}
                    label="Remember me"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Sign in
                </Button>
                <Link to="/register">
                    <Typography variant="body2">
                        Register
                    </Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" mt={5}>
                    &copy; 2017–2021
                </Typography>
            </form>
        </Box>
    </Container>);
}

export default Login;