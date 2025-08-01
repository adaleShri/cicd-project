import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function AppointmentListDoctor() {
    const navigate = useNavigate();
    const { token, id } = useSelector((store) => store.user);
    const [patientList, setPatientList] = useState([]);
    const config = {
        headers: { "Authorization": "Bearer " + token }
    };
    useEffect(() => {
        getPatientList();
    }, []);

    const getPatientList = async () => {
        let response = await api.get("/patients/all", config);

        if (response.data) {
            setPatientList(response.data);
        }
        else {
            toast.error("Something went wrong");
        }
    }
    const deletePatient = async (id) => {
        let response = await api.delete(`/patients/delete/${id}`, config);
        if (response.data) {
            toast.success("Record delete successfully");
            let index = patientList.findIndex((obj => obj._id === id));
            patientList.splice(index, 1);
            setPatientList([...patientList])
            console.log(response.data);
        }
        else {
            toast.error("Record not deleted!!");
            console.log(response.data);
        }
    }
    return <>
        <ToastContainer />
        <table className="table table-striped mt-2">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Phone Number</th>
                    <th>Diagnosis</th>
                    <th>Appointment Date</th>

                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {patientList.filter((patient) => patient.doctor === id).map((patient, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{patient._id}</td>
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.age}</td>
                        <td>{patient.phoneNumber}</td>
                        <td>{patient.daignosis}</td>
                        <td>{patient.appointmentDate}</td>
                        <td>
                            <button className="btn btn-outline-primary mr-2" onClick={() => navigate("/view-patient", {
                                state: {
                                    pId: patient._id,
                                }
                            })}>View Details</button>
                            <button className="btn btn-outline-info" onClick={() => navigate("/update-patient", {
                                state: {
                                    pId: patient._id,
                                }
                            })}>Update</button>
                            <button className="btn btn-outline-danger ml-2" onClick={() => deletePatient(patient._id)} >Delete</button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </>
}