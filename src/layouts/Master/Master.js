import {Outlet} from "react-router-dom";
import './Master.css'
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function Master() {
    return (<>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>)
}

export default Master;