const Error = ({ error }) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="alert alert-danger col-md-4 col-md-offset-4" align="center" role="alert">
                {error}
            </div>
        </div>




    );
}

export default Error;