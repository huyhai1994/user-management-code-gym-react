import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import HomeImage from "../../assests/HomeImage.jpg";
import MusicDisk from "../../assests/MusicDisk.jpg";
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
            <img
                src={MusicDisk}
                alt="Music Disk"
                className="position-absolute  rounded-circle"
                style={{
                    width: '350px',
                    height: 'auto',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: '1',
                    filter: 'drop-shadow(0 0 20px #121212)'
                }}
            />
            <Container
                className="position-relative text-center text-white d-flex flex-column justify-content-center h-100">
                <p className="mb-4 header-top-left h1">Welcome to My Music Store</p>
                <p className="mt-3 text-bg-info fw-bold h4 hero-subtitle-text">
                    Discover a wide variety of musical instruments,<br/> accessories, and more.
                </p>
                <p className="h5">
                    Whether you're a beginner or
                    a professional,
                </p>
                <p className="h5"> we have something for everyone.</p>
                <div>
                    <Button variant="primary" as={Link} to="/login" className="me-2" style={{width: '150px'}}>
                        Login
                    </Button>
                    <Button className="" variant="secondary" as={Link} to="/register" style={{width: "150px"}}>
                        Register
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Home;