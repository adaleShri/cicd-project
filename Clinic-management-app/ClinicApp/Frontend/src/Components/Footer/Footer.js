import { Link } from "react-router-dom";

export default function Footer(){
  const latitude = 22.703081;
  const longitude = 75.866349;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
return <>
    <section className="info_section ">
    <div className="container">
      
      <div className="info_bottom layout_padding2">
        <div className="row info_main_row">
        <div className="col-md-4 col-lg-4 ">
          <Link>
          <img src="images/logo.png" style={{ height: 130, width: 180 }} alt=""/>
          </Link>
        </div>
          <div className="col-md-4 col-lg-4">
           
            <div className="info_contact">
              <Link>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                  {/* <Link to={mapUrl}>Location</Link> */}
                  <span onClick={() => window.location.href = mapUrl }>Location</span>
                </span>
              </Link>
              <Link>
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +91 9754947747
                </span>
              </Link>
              <Link>
                <i className="fa fa-envelope"></i>
                <span>
                  {/* <Link to={"mailto:shivamlowanshi@gmail.com"}>shivamlowanshi@gmail.com</Link> */}
                  <span onClick={() => window.location.href = "mailto:shivamlowanshi@gmail.com" }>shivamlowanshi@gmail.com</span>
                </span>
              </Link>
            </div>
            <div className="social_box">
              <Link>
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </Link>
              <Link>
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </Link>
              <Link>
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </Link>
              <Link>
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-lg-4">
            <div className="info_links">
              <div className="info_links_menu">
                <Link to={'/'} className="active">
                  Home
                </Link>
                <Link to={'/about'} >
                  About
                </Link>
                <Link to={'/treatment'} >
                  Treatment
                </Link>
                <Link to={'/doctors'}>
                  Doctors
                </Link>
                <Link to={'/testimonial'}>
                  Testimonial
                </Link>
                <Link to={'/contact'} >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
  
  <footer className="footer_section">
    <div className="container">
      <p>
        &copy; <span id="displayYear"></span> All Rights Reserved Designed and Developed By
        <Link to={"https://shivampersonal.onrender.com/"}> Shivam</Link>
      </p>
    </div>
  </footer>
</>
}