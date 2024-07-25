import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import HomeImage from "../../assests/HomeImage.jpg";
import "./Home.css";


function Home() {
    return (
        <div className="position-relative overflow-hidden vh-100">
            <img
                src={HomeImage}
                alt="Background"
                className="position-absolute w-100 h-100"
                style={{
                    left: '50%',
                    top: '50%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-1'
                }}
            />
            <Container
                className="position-relative text-center text-white d-flex flex-column justify-content-center h-100">
                <h2 className="mb-4 text-top-left">Welcome to My Music Store</h2>
                <p className="mb-4 text-top-left">
                    Discover a wide variety of musical instruments, accessories, and more. Whether you're a beginner or
                    a professional, we have something for everyone.
                </p>
                <div>
                    <Button variant="primary" as={Link} to="/login" className="me-2">
                        Login
                    </Button>
                    <Button className="" variant="secondary" as={Link} to="/register">
                        Register
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Home;