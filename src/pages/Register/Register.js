import {Link} from "react-router-dom";
import {Container, Box, TextField, Button, Typography} from "@mui/material";
import "./Register.css";

function Register() {
    return (<Container maxWidth="sm">
        <Box display="flex" justifyContent="center" mt={5}>
            <Box textAlign="center" width="100%">
                <form className="border p-3 shadow">
                    <Typography variant="h3" component="h1" gutterBottom>
                        Please register
                    </Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            placeholder="name"
                            name="name"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email address"
                            variant="outlined"
                            placeholder="name@example.com"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            placeholder="Password"
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Register
                    </Button>
                    <Box mt={2}>
                        <Link to="/login">
                            <Typography variant="body2">Login</Typography>
                        </Link>
                    </Box>
                    <Typography variant="body2" color="textSecondary" mt={5}>
                        &copy; 2017–2021
                    </Typography>
                </form>
            </Box>
        </Box>
    </Container>);
}

export default Register;