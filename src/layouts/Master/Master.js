import {Outlet, useNavigate} from "react-router-dom";
import './Master.css'
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import {useEffect} from "react";
import {useSelector} from "react-redux";

function Master() {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/login")
        }
    }, [auth, navigate])

    return (<>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>)
}

export default Master;