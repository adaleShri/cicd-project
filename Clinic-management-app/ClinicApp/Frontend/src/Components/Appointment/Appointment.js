import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Appointment() {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [daignosis, setDaignosis] = useState('');
 const [receptionist, setReceptionist] = useState();
  const [receptionistList, setReceptionistList] = useState([]);
  const navigate = useNavigate();
  

  const handleReceptionistChange=(event)=>{
    const seletedId = event.target.value;
    const selectedReceptionist = receptionistList.find((reception)=>reception._id===seletedId);
    setReceptionist(selectedReceptionist);
  }

  useEffect(() => {
    loadReceptionist();
  }, []);



  const loadReceptionist = async () => {
    let response = await api.get("/receptionist/all");
    if (response.data) {
      setReceptionistList(response.data);

    }
    else {
      toast.error("Oops something went wrong");
    }
  }

  const bookAppointment = async (event) => {
    event.preventDefault();
    const response = await api.post("/patients/book-appointment", 
      { firstName, lastName, gender, age, phoneNumber, appointmentDate, daignosis, receptionist:receptionist._id, doctor:receptionist.doctor});

    if (response.data) {
      toast.success("Appointment done");
      navigate('/');
    }
    else {
      toast.error("Appointment not done");
      console.log(response.data);
    }
  }

  return <>
    <ToastContainer />
    <section className="book_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={bookAppointment}>
              <h4>
                BOOK <span>APPOINTMENT</span>
              </h4>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">First Name</label>
                  <input type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)} placeholder="Your First Name" required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Last Name</label>
                  <input type="text" className="form-control" onChange={(e) => setLastName(e.target.value)} placeholder="Your Last Name" required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPhoneNumber">Phone Number</label>
                  <input type="text" className="form-control" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="9977XXXXXX" required />
                </div>

              </div>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputDepartmentName">Gender</label>
                  <select className="form-control wide" onChange={(e) => setGender(e.target.value)} >
                    <option>Select</option>
                    <option value="Male">Male </option>
                    <option value="Female">Female </option>
                    <option value="Others">Other </option>
                  </select>
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputSymptoms">Age</label>
                  <input type="nmber" className="form-control" placeholder="Your Age" onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputDate">Appointment Date </label>
                  <div className="input-group date" id="inputDate" data-date-format="mm-dd-yyyy">
                    <input type="date" className="form-control" onChange={(e) => setAppointmentDate(e.target.value)} required />
                  </div>
                </div>
              </div>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Primary Concern</label>
                  <input type="text" className="form-control" onChange={(e) => setDaignosis(e.target.value)} placeholder="Concern" required />
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputDepartmentName">Branch</label>
                  <select onChange={ handleReceptionistChange} className="form-control wide" >
                    <option>Select</option>
                    {
                      receptionistList.map((reception, index) => (
                        <option key={index} value={reception._id}>
                          {reception.clinicAddress}
                        </option>
                      ))
                      
                    }
                  </select>
                </div>
              </div>
              <div className="btn-box">
                <button type="submit" className="btn">Submit Now</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </section >
  </>
}