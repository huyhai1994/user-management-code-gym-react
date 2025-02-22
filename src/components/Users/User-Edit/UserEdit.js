import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import Loading from "../../Common/Loading/Loading";
import {toast} from "react-toastify";
import UserService from "../../../services/user.service";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

const editSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required"), name: Yup.string()
        .required("Name is required")
});

function UserEdit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState(null);

    const editForm = useFormik({
        initialValues: {
            name: '', email: '', dob: '', active: '', avatar: ''
        }, validationSchema: editSchema, onSubmit: (values) => {
            UserService.updateUser(id, values).then(response => {
                toast.success('User updated successfully', {});
                editForm.resetForm();
                navigate("/admin/users");
            });
        }
    });

    useEffect(() => {
        UserService.getUserById(id)
            .then(response => {
                setUser(response.data);
                editForm.setValues({
                    name: response.data.name,
                    email: response.data.email,
                    dob: response.data.dob,
                    active: response.data.active,
                    avatar: response.data.avatar
                });
            })
            .catch(error => {
                console.error('Error fetching user: ', error);
            });
    }, [id, navigate]);

    if (!user) {
        return <div><Loading/></div>;
    }

    return (<Container maxWidth="sm" className="user-edit" sx={{marginTop: '10%'}}>
        <Box mt={5}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Edit user
            </Typography>
            <form onSubmit={editForm.handleSubmit}>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        variant="outlined"
                        value={editForm.values.name}
                        onChange={editForm.handleChange}
                        error={Boolean(editForm.errors.name)}
                        helperText={editForm.errors.name}
                    />
                </Box>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Email address"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={editForm.values.email}
                        onChange={editForm.handleChange}
                        error={Boolean(editForm.errors.email)}
                        helperText={editForm.errors.email}
                    />
                </Box>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Birth Day"
                        name="dob"
                        type="date"
                        variant="outlined"
                        value={editForm.values.dob}
                        onChange={editForm.handleChange}
                        error={Boolean(editForm.errors.dob)}
                        helperText={editForm.errors.dob}
                    />
                </Box>
                <Box mb={3}>
                    <input
                        accept="image/*"
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={(event) => {
                            editForm.setFieldValue("avatar", event.currentTarget.files[0]);
                        }}
                    />
                    {editForm.errors.avatar && <div>{editForm.errors.avatar}</div>}
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

export default UserEdit;