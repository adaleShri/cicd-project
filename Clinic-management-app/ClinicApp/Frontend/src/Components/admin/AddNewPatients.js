import { ToastContainer, toast } from "react-toastify";
import {  useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
import { useNavigate } from "react-router-dom";
export default function AddNewPatients() {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const { token, id } = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [daignosis, setDaignosis] = useState('');
  const navigate = useNavigate();


  const addNewPatient = async (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    }

    try {
      const response = await api.post("/patients/register", { firstName, lastName, gender, age, phoneNumber, appointmentDate, daignosis, doctor: id }, config);

      if (response.data) {
        toast.success("Patient added");
        navigate('/patient-list-receptionist')
      }
    }
    catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "something went wrong");
      }
      else {
        toast.error('something went wrong');
      }
    }
  }

  return <>
    <ToastContainer />
    <section className="book_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={addNewPatient}>
              <h4>
                ADD <span>APPOINTMENT</span>
              </h4>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Patient First Name </label>
                  <input onChange={(event) => setFirstName(event.target.value)} type="text" className="form-control" placeholder="Enter first name" required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Patient Last Name</label>
                  <input onChange={(event) => setLastName(event.target.value)} type="text" className="form-control" placeholder="Enter last name" required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Age </label>
                  <input onChange={(event) => setAge(event.target.value)} type="text" className="form-control" placeholder="Age" required />
                </div>

              </div>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label >Gender</label>
                  <select onChange={(event) => setGender(event.target.value)} name={gender} className="form-control wide" >
                    <option>Select</option>
                    <option value="Male">Male </option>
                    <option value="Female">Female </option>
                    <option value="Others">Other </option>
                  </select>
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputDate">Choose Date </label>
                  <input onChange={(event) => setAppointmentDate(event.target.value)} type="date" className="form-control" required />
                </div>
                <div className="form-group col-lg-4">
                  <label>Phone Number</label>
                  <input onChange={(event) => setPhoneNumber(event.target.value)} type="text" className="form-control" required />
                </div>
              </div>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Patient primary concern </label>
                  <input onChange={(event) => setDaignosis(event.target.value)} type="text" className="form-control" placeholder="Primary concern" required />
                </div>
              </div>
              <div className="btn-box">
                <button type="submit" className="btn ">Submit Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
}