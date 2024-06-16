import { Link } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {actionCreators} from "./state/index.js"

const Nav = (props) => {

  const dispatch = useDispatch();

  const firstName = useSelector(state => state.firstName.firstName)

  const logout = () =>{
    try{
      axios.post("http://localhost:8000/api/v1/user/logout")
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('user');
      dispatch(actionCreators.logoutUser());
      window.location.href = '/';
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Info.Io</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${props.active1}`} aria-current="/" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {firstName? (
                  <Link className={`nav-link ${props.active2}`} to="/profile">Profile</Link>
                ): (
                  null
                )}
              </li>
              <li className="nav-item">
                {firstName? (
                  <Link className={`nav-link ${props.active3}`} to="/your-story">Your Story </Link>
                ): (
                  null
                )}
              </li>
            </ul>
            {firstName? (
              <button className="btn btn-success" style={{ marginRight: "20px" }}>{props.userName}</button>
            ): (
              null
            )}
            {/* <button className="btn btn-success" style={{ marginRight: "20px" }}>{props.userName}</button> */}
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>

            {firstName? (
              <button
              style={{marginLeft:"20px"}}
              type="button"
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
            ): (
              <Link to="/login" style={{marginLeft:"20px"}} className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav