import {Link} from "react-router-dom";
import "./Register.css";

function Register() {
    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="form-register text-center mt-5">
                    <form>
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>
                        <div className="form-floating mb-1">
                            <input type="text" className="form-control" id=""
                                   placeholder="name"/>
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="email" className="form-control" id="floatingInput"
                                   placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="floatingPassword"
                                   placeholder="Password"/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                        <Link to={"/login"}>
                            <small>Login</small>
                        </Link>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register;