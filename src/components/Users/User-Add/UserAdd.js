import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {toast} from "react-toastify";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const registerSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required")
});
const API_URL = 'https://669dd2f69a1bda3680047410.mockapi.io/users/';

function UserAdd() {
    const navigate = useNavigate();
    const registerForm = useFormik({
        initialValues: {
            name: '', email: '', password: '',
        }, validationSchema: registerSchema, onSubmit: (values) => {
            axios.post(API_URL, values).then(response => {
                console.log(values);
                toast.success('User registered successfully', {})
                registerForm.resetForm();
                navigate("/admin/users");
            })
        }
    });

    return (<Container maxWidth="sm">
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