import { useSelector } from "react-redux";
import api from "../../api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function DoctorProfile() {
    const location = useLocation();
    const [doctor, setDoctor] = useState({});
    const { doctorId } = location.state;
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const getDoctorData = async (id) => {
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        try {
            let response = await api.get(`/doctors/getById/${id}`, config);
            if (response.data) {
                setDoctor(response.data.doctor);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.error || "something went wrong");
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }

    useEffect(() => {
        getDoctorData(doctorId);
    }, []);

    return <>
    <ToastContainer/>
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form >
                            <h4>
                                Doctor<span> Details</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="Id">ID</label>
                                    <input type="text" value={doctor._id} className="form-control" id="patientId" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" value={doctor.firstName} className="form-control" id="inputPatientName" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Last Name</label>
                                    <input type="text" value={doctor.lastName} className="form-control" id="inputPhone" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" value={doctor.email} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Phone</label>
                                    <input type="text" value={doctor.phoneNumber} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Gender</label>
                                    <input type="text" value={doctor.gender} className="form-control" id="email" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="btn-box">
                                <button className="btn btn-info ml-3" onClick={() => navigate('/update-doctor', {
                                    state: {
                                        doctorId: doctor._id,
                                    }
                                })}>Update</button>
                            </div>
                            <div className="btn-box">

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}