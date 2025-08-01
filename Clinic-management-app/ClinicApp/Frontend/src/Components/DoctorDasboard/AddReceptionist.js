import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";

export default function AddReceptionist() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [gender, setGender] = useState('');
    const { token, id } = useSelector((store) => store.user);
    const saveReceptionist = async (event) => {
        event.preventDefault();
        const config = {
            headers: { Authorization: "Bearer " + token }
        };
        let response = await api.post("/receptionist/register", { firstName, lastName, email, phoneNumber, password, clinicAddress, gender, doctor: id }, config);

        if (response.data) {
            toast.success("Receptionist saved");
        }
        else {
            toast.error("Oops something went wrong");
        }
    }
    return <>
        <ToastContainer />
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={saveReceptionist} >
                            <h4>
                                ADD <span>RECEPTIONIST</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" onChange={(event) => setFirstName(event.target.value)} className="form-control" id="inputPatientFirstName" placeholder="Jenna" required />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Last Name</label>
                                    <input type="text" onChange={(event) => setLastName(event.target.value)} className="form-control" id="inputPatientLastName" placeholder="Ortega" required />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Email</label>
                                    <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" id="inputEmail" placeholder="e.g. name@gmail.com" required />
                                </div>

                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Password</label>
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" id="inputPassword" placeholder="*******" required />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Address</label>
                                    <input type="text" onChange={(event) => setClinicAddress(event.target.value)} className="form-control" id="inputAddress" placeholder="e.g 18 Sarita Apartment" required />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label >Gender</label>
                                    <select onChange={(event) => setGender(event.target.value)} name={gender} className="form-control wide" >
                                        <option>Select</option>
                                        <option value="Male">Male </option>
                                        <option value="Female">Female </option>
                                        <option value="Others">Other </option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Phone Number</label>
                                    <input type="text" onChange={(event) => setPhoneNumber(event.target.value)} className="form-control" id="phone" placeholder="9977xxxxxx" required />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Doctor Id</label>
                                    <input type="text" value={id} className="form-control" id="doctor" readOnly />
                                </div>

                            </div>
                            <div className="btn-box">
                                <button type="submit" className="btn ">ADD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}