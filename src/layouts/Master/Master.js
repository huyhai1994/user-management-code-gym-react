import {Outlet} from "react-router-dom";
import './Master.css'
import NavBar from "../../components/NavBar/NavBar";

function Master() {
    return (<>
        <NavBar/>
        <Outlet/>
        <h5>Day la footer</h5>
    </>)
}

export default Master;