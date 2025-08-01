import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../Redux-config/UserSlice";


export default function Header() {
  const { isLoggedIn, role, firstName } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const latitude = 22.703081;
  const longitude = 75.866349;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  return <>
    <header className="header_section">
      <div className="header_top">
        <div className="container">
          <div className="contact_nav">
            <a >
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>
                Call : +91 9754947747
              </span>
            </a>
            <a >
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>
                <a href="mailto:shivamlowanshi@gmail.com"> shivamlowanshi@gmail.com</a>
              </span>
            </a>
            <a >
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>

                <Link to={mapUrl}> Location </Link>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to={'/home'}>
              <img src="images/logo.png" style={{ height: 100, width: 150 }} alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className=""> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">

                {isLoggedIn ? (
                  role === "doctor" ? (
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <Link to={"/add-receptionist"} className="nav-link" >ADD RECEPTIONIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/reception-list"} className="nav-link">RECEPTIONIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/appointment-list-doctor"} className="nav-link">PATIENT LIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/patient-appointment-doctor"} className="nav-link" >APPOINTMENTS</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/profile'} className="nav-link" >PROFILE</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => dispatch(signOut())} className="btn btn-light mt-2" >LOG OUT</Link>
                      </li>
                      <li>
                      </li>
                      <li>
                        <h4 className="nav-link text-white ml-5 border-bottom border-light">{"WELCOME DR. " + firstName.toUpperCase()}</h4>
                      </li>
                    </ul>
                  ) : role === "receptionist" ? (
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <Link to={"/add-appointment"} className="nav-link" >ADD APPOINTMENT</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/patient-list-receptionist'} className="nav-link">PATIENT LIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/appointment-list-receptionist'} className="nav-link">APPOINTMENT LIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/profile'} className="nav-link" >PROFILE</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => dispatch(signOut())} className="btn btn-light mt-2" >LOG OUT</Link>
                      </li>
                      <li>
                        <h4 className="nav-link text-white ml-5 border-bottom border-light">{role.toUpperCase() + "IST-" + firstName.toUpperCase()}</h4>
                      </li>
                    </ul>
                ) : role === "admin" ? ( 
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <Link to={"/doctor-panel"} className="nav-link" >DOCTOR <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/receptionist-panel"} className="nav-link" >RECEPTIONIST</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/patient-panel"} className="nav-link" >PATIENT</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/appointment-list-admin"} className="nav-link" >APPOINTMENT</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/profile"} className="nav-link" >PROFILE</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => dispatch(signOut())} className="btn btn-light mt-2" >LOG OUT</Link>
                      </li>
                      <li>
                        <h4 className="nav-link text-white ml-5 border-bottom border-light">{role.toUpperCase() + "-" + firstName.toUpperCase()}</h4>
                      </li>
                    </ul>
                  ) : null ) : (
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <Link to={"/"} className="nav-link" >Home <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/about"} className="nav-link" > About</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/treatment"} className="nav-link" >Treatment</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/doctors"} className="nav-link" >Doctors</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/testimonial"} className="nav-link" >Testimonial</Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"contact"} className="nav-link" >Contact Us</Link>
                      </li>
                    </ul>
                  )}

              </div>
              <div className="quote_btn-container">
                {!isLoggedIn ? <>
                  <Link to={"/sign-in"}>

                    <span>
                      <button className="btn btn-light"><i className="fa fa-user" aria-hidden="true"></i> Sign In</button>
                    </span>
                  </Link>
                  {/* <Link to={"/sign-up"}>

                    <span>
                      <button className="btn btn-light"> <i className="fa fa-user" aria-hidden="true"></i> Sign Up</button>
                    </span>
                  </Link> */}
                </> : ""}

              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </>
}