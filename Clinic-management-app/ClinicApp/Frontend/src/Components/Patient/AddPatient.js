import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
import { useNavigate } from "react-router-dom";
export default function AddPatient(){
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const {token, id} = useSelector((store)=>store.user);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [age, setAge] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [gender, setGender] = useState(null);
    const [daignosis, setDaignosis] = useState('');
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState('');

    // console.log(doctor);

    const getDoctor=async()=>{
      const config = {
        headers:{Authorization : 'Bearer '+token}
      }
      const response = await api.get(`/receptionist/getById/${id}`, config);
      if(response.data){
        setDoctor(response.data.receptionist.doctor);
      }
      else{
        console.log(response.data);
      }
    }

    useEffect(()=>{
      getDoctor();
    },[])

    const addNewPatient=async(event)=>{
      event.preventDefault();
      const config = {
        headers:{Authorization : 'Bearer '+token}
      }
      const response = await api.post("/patients/register",{firstName,lastName, gender, age, phoneNumber, appointmentDate, daignosis, doctor}, config);
     
      if(response.data){
        toast.success("Patient added");
        navigate('/patient-list-receptionist')
      }
      else{
        toast.error("patient not added");
        console.log(response.data);
      }
    }

    return<>
   <ToastContainer/>
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
                  <input onChange={(event)=>setFirstName(event.target.value)} type="text" className="form-control"  placeholder="Enter first name" required/>
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Patient Last Name</label>
                  <input onChange={(event)=>setLastName(event.target.value)} type="text" className="form-control"  placeholder="Enter last name" required/>
                </div>
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Age </label>
                  <input onChange={(event)=>setAge(event.target.value)} type="text" className="form-control"  placeholder="Enter Age" required/>
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
                  <input onChange={(event)=>setAppointmentDate(event.target.value)} type="date" className="form-control" required/>
                </div>
                <div className="form-group col-lg-4">
                    <label>Phone Number</label>
                    <input onChange={(event)=>setPhoneNumber(event.target.value)} type="text" className="form-control" placeholder="9977XXXXXX" required/>
                </div>
              </div>
              <div className="form-row ">
                <div className="form-group col-lg-4">
                  <label htmlFor="inputPatientName">Patient primary concern </label>
                  <input onChange={(event)=>setDaignosis(event.target.value)} type="text" className="form-control"  placeholder="Primary concern" required/>
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