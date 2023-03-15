function Pnf() {
  return (
    <>
      <div className="container main d-flex flex-column justify-content-center align-items-center">
        <div className="text-center text-danger">
          <h1 className="fw-bold">
            <strong>Error 404 - Page Not Found</strong>
          </h1>
          <h5>
            the page you were trying to reach on a website couldn't be found on
            the server
          </h5>
        </div>
        <div className="text-center mt-4 mb-4">
          <button
            className="btn btn-dark"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Pnf;
