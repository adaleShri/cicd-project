
import { useSelector } from "react-redux";
import api from "../../api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PatientProfile() {
    const location = useLocation();
    const [patient, setPatient] = useState({});
    const { pId } = location.state;
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const getPatientData = async (id) => {
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.get(`/patients/getById/${id}`, config);
        if (response.data) {
            setPatient(response.data.patient);
        }
        else {
            console.log(response.data)
        }
    }


    useEffect(() => {
        getPatientData(pId);
    }, []);

    return <>
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form >
                            <h4>
                                Patient<span> Details</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="Id">ID</label>
                                    <input type="text" value={patient._id} className="form-control" id="patientId" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" value={patient.firstName} className="form-control" id="inputPatientName" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Last Name</label>
                                    <input type="text" value={patient.lastName} className="form-control" id="inputPhone" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="age">Age</label>
                                    <input type="text" value={patient.age} className="form-control" id="age" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Phone</label>
                                    <input type="text" value={patient.phoneNumber} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Gender</label>
                                    <input type="text" value={patient.gender} className="form-control" id="email" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Diagnosis</label>
                                    <input type="text" value={patient.daignosis} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Appointment Date</label>
                                    <input type="text" value={patient.appointmentDate} className="form-control" id="email" readOnly="readonly" />
                                </div>

                            </div>
                            <div className="btn-box">
                                <button className="btn btn-info" onClick={() => navigate('/update-patient', {
                                    state: {
                                        pId: patient._id,
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