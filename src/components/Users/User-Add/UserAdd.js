function UserAdd() {
    return (

        <div className='container mt-5 '>
            <h1 className='text-center'>Add new user</h1>
            <form className='border p-3 rounded-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="email" className="form-control" id="exampleInputName" aria-describedby="nameHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>)
}

export default UserAdd;