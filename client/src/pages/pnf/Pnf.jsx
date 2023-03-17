import "./pnf.css";
import { useNavigate } from "react-router-dom";
function Pnf() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="pnfPage">
          <div className="pnf">
            <p>4</p>
            <img
              src="https://i.postimg.cc/fygSnQQx/Starlight-Aluminum-Blue.png"
              alt="watch"
            />
            <p>4</p>
          </div>
          <p className="pngText">The page you’re looking for can’t be found.</p>
          <button className="bttn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default Pnf;
