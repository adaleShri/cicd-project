import { Link } from "react-router-dom";

export default function Banner() {
    return <>
        <div className="hero_area">
            <section className="slider_section ">
                <div className="dot_design">
                    <img src="images/dots.png" alt="" />
                </div>
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detail-box">
                                            
                                            <h1>
                                                Aakanksha <br />
                                                <span>
                                                    clinic
                                                </span>
                                            </h1>
                                            <h4>
                                               We are trusted by over thousands of Patients
                                            </h4>
                                            <Link to={"/contact"} className="btn btn-dark mt-3">
                                                Contact Us
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detail-box">
                                            
                                            <h1>
                                            Aakanksha <br />
                                                <span>
                                                    Clinic
                                                </span>
                                            </h1>
                                            <h4>
                                               We are trusted by over thousands of Patients
                                            </h4>
                                            <Link to={"/contact"} className="btn btn-dark mt-3">
                                                Contact Us
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img2.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detail-box">
                                            
                                            <h1>
                                            Aakanksha <br />
                                                <span>
                                                    Clinic
                                                </span>
                                            </h1>
                                            <h4>
                                               We are trusted by over thousands of Patients
                                            </h4>
                                            <Link to={"/contact"} className="btn btn-dark mt-3">
                                                Contact Us 
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img3.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel_btn-box">
                        <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
                            <img src="images/prev.png" alt="" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
                            <img src="images/next.png" alt="" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

            </section>
        </div>

    </>
}