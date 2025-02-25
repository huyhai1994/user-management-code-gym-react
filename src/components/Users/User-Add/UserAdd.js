import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {toast} from "react-toastify";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import UserService from "../../../services/user.service";
import './User-Add.css'

const registerSchema = Yup.object().shape({
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]{1,32}@[a-zA-Z0-9.-]{6,32}\.(com|vn|us)$/, "Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().matches(/^[a-zA-Z\s]+$/, "Name can only contain letter").required("Name is required")
});

function UserAdd() {
    const navigate = useNavigate();
    const registerForm = useFormik({
        initialValues: {
            name: '', email: '', password: '',
        }, validationSchema: registerSchema, onSubmit: (values) => {
            UserService.createUser(values).then(response => {
                toast.success('User registered successfully', {})
                registerForm.resetForm();
                navigate("/admin/users");
            })
        }
    });

    return (<Container maxWidth="sm" className="user-add">
        <Box mt={5}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Add new user
            </Typography>
            <form onSubmit={registerForm.handleSubmit}>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        variant="outlined"
                        onChange={registerForm.handleChange}
                        error={Boolean(registerForm.errors.name)}
                        helperText={registerForm.errors.name}
                    />
                </Box>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Email address"
                        name="email"
                        type="email"
                        variant="outlined"
                        onChange={registerForm.handleChange}
                        error={Boolean(registerForm.errors.email)}
                        helperText={registerForm.errors.email}
                    />
                </Box>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        onChange={registerForm.handleChange}
                        error={Boolean(registerForm.errors.password)}
                        helperText={registerForm.errors.password}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
    </Container>);
}

export default UserAdd;