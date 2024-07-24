import React, {useContext} from 'react'
import {SearchContext} from "../../../context/SearchContext";
import {useFormik} from "formik";
import {toast} from "react-toastify";

const UserSearch = () => {
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

    return (<div>
        <form className="d-flex" role="search" onSubmit={formik.handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search"
                   aria-label="Search"
                   name="searchQuery"
                   value={formik.values.searchQuery}
                   onChange={formik.handleChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>)
}
export default UserSearch
