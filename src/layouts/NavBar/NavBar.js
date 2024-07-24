import './NavBar.css';
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {SearchContext} from "../../context/SearchContext";
import {useContext} from "react";

const NavBar = () => {
    const {setSearchQuery} = useContext(SearchContext);
    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        }, onSubmit: (values) => {
            setSearchQuery(values.searchQuery);
            toast.success(`Searching for ${values.searchQuery}`);
            formik.resetForm();
        },
    });

    return (<>
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {/*TODO: user management section start*/}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle btn btn-link" type="button"
                                  id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                                  to={'/admin/users'}>
                                User Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/admin/users/create">User Add</Link></li>
                                <li><Link className="dropdown-item" to="/admin/users">User List</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={formik.handleSubmit}>
                        <input className="form-control me-2" type="search" placeholder="Search"
                               aria-label="Search"
                               name="searchQuery"
                               value={formik.values.searchQuery}
                               onChange={formik.handleChange}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </>);
}

export default NavBar;