import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function PatientAppointmentDoctor() {
  const { token, id } = useSelector((store) => store.user);
  const [patientList, setPatientList] = useState([]);
  const [status, setStatus] = useState(false);

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  useEffect(() => {
    getPatientList();
  }, [patientList]);

  const getPatientList = async () => {
    let response = await api.get("/patients/all", config);
    if (response.data) {
      setPatientList(response.data);
      //setUnique([...new Set(response.data.map((patient)=>patient.address.raddress))]); 
    }
    else {
      toast.error("Something went wrong");
    }
  }

  const donePatient = async (id) => {
    let response = await api.put(`patients/apointment-done/${id}`, null, config);
    if (response.data) {
      toast.success("Patient Appointment Done");
      let index = patientList.findIndex((obj) => obj._id === id);
      patientList[index].appointmentStatus = true;
      patientList.splice(index, 1);
      setPatientList([...patientList]);
      console.log(response.data);
    }
    else {
      console.log(response.data);
      toast.error("Not done");
    }
  }

  const undoPatient = async (id) => {
    let response = await api.put(`patients/apointment-undo/${id}`, null, config);
    if (response.data) {
      toast.success("Patient Appointment Undo");
      //let index = patientList.findIndex((obj) => obj.id === id);
      //patientList[index].appointmentStatus = false;
      //patientList.splice(index,1);
      setPatientList([...patientList]);
    }
    else {
      toast.error("Not done");
    }
  }

  return <>
    <ToastContainer />
    <div className="form-group mt-3 mb-3 d-flex justify-content-center">
      {/* <h4 className="mr-4 "> Please Select Branch</h4>&nbsp; */}
      {/* <select className="form-control" style={{ width: 200 }} >
        <option>All</option>
        {/* {patientList.map((patient, index)=> <option key={index}>
        {patient.address.raddress} */}
      {/* {unique.map((address, index)=><option key={index}>
          {address} */}
      {/* </option>)}</select> */}
      <button onClick={() => setStatus(false)} className="btn btn-outline-primary ml-5"  >Incomplete Patients</button>
      <button onClick={() => setStatus(true)} className="btn btn-outline-warning ml-5" >Completed Patients</button>
    </div>
    <table className="table table-striped mt-2">
      <thead>
        <tr>
          <th>S.no</th>
          <th>Id</th>
          <th>name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Phone Number</th>
          <th>Receptionist</th>
          <th>Appointment Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patientList.filter((patient) => patient.appointmentStatus === status && patient.doctor === id)
          .map((patient, index) => <tr key={index}>
            <td>{index + 1}</td>
            <td>{patient._id}</td>
            <td>{patient.firstName}</td>
            <td>{patient.gender}</td>
            <td>{patient.age}</td>
            <td>{patient.phoneNumber}</td>
            <td>{patient.receptionist}</td>
            <td>{patient.appointmentDate}</td>
            <th>
              {(status) ?
                <button className="btn btn-outline-primary" onClick={() => undoPatient(patient._id)}>Undo</button> :
                <button className="btn btn-outline-primary" onClick={() => donePatient(patient._id)}>Done</button>}
            </th>
          </tr>)}
      </tbody>
    </table>
  </>
}