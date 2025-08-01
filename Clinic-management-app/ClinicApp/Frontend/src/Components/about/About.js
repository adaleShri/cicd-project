import { Link } from "react-router-dom";


export default function About() {
    return <>
        <section className="about_section mt-5 mb-5">
            <div className="container  ">
                <div className="row">
                    <div className="col-md-6 ">
                        <div className="img-box">
                            <img src="images/about-img.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                                <h2>
                                    About <span>Clinic</span>
                                </h2>
                            </div>
                            <p>
                            Aakanksha Clinic is an ultra-modern, state-of-the-art super-speciality tertiary eye-care institute located at Indore, Madhya Pradesh. The hospital is equipped with the most modern technology specializing in the delivery of appropriate and affordable medical care of the highest quality to Retina patients.</p>
                            <Link>
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}