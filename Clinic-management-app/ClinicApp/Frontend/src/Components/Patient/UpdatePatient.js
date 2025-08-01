import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function UpdatePatient() {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useSelector(store => store.user);
    const [patient, setPatient] = useState({});
    const { pId} = location.state;
    
    useEffect(()=>{
        getPatientData(pId);
    },[]);

    const UpdateAppointment = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.put(`/patients/update/${pId}`, patient, config);
        if(response.data){
            toast.success("details updated..")
            navigate('/appointment-list');
        }
        else{
            toast.error("Oops! details not updated");
            console.log(response.data)
        }
    }

    const getPatientData=async(id)=>{
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.get(`/patients/getById/${id}`, config);
        if(response.data){
            setPatient(response.data.patient);
        }
        else{
            console.log(response.data)
        }
    }

    const handleInputChange = (field, value) => {
        setPatient((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return <>
        <ToastContainer />
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={UpdateAppointment}>
                            <h4>
                                Update <span>APPOINTMENT</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">Patient's First Name </label>
                                    <input defaultValue={patient.firstName || ""} onChange={(event) => handleInputChange("firatName",event.target.value)} type="text" className="form-control"  />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">Patient's Last Name </label>
                                    <input defaultValue={patient.lastName || ""} onChange={(event) => handleInputChange("lastName",event.target.value)} type="text" className="form-control"  />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputDate">Appointment Date </label>
                                    <input defaultValue={formatDate(patient.appointmentDate) || ""} onChange={(event) => handleInputChange("appointmentDate",event.target.value)} type="date" className="form-control"  />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientAge">Patient's age</label>
                                    <input defaultValue={patient.age || ""} onChange={(event) => handleInputChange("age",event.target.value)} type="number" className="form-control"  />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientNumber">Phone Number </label>
                                    <input defaultValue={patient.phoneNumber || ""} onChange={(event) => handleInputChange("phoneNumber",event.target.value)} type="text" className="form-control"  />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputDaignosis">Daignosis</label>
                                    <input defaultValue={patient.daignosis || ""} onChange={(event) => handleInputChange("daignosis",event.target.value)} type="text" className="form-control"  />
                                </div>
                            </div>
                            <div className="btn-box">
                                <button type="submit" className="btn ">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}