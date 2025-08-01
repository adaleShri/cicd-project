import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useSelector } from "react-redux";

export default function AddDoctor() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('doctor');
    const navigate = useNavigate();
    const { token } = useSelector((store) => store.user);

    const signUpDoctor = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: { Authorization: 'Bearer ' + token }
            }
            const response = await api.post("/doctors/register", { firstName, lastName, email, phoneNumber, password, gender, role },
                config
            );

            if (response.data) {
                toast.success('doctor added');
                navigate('/doctor-list')
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
                        <form onSubmit={signUpDoctor}>
                            <h4>
                                Add Doctor<span> Or Admin</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" onChange={(event) => setFirstName(event.target.value)} className="form-control" id="inputPatientName" placeholder="Shivam" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">Last Name </label>
                                    <input type="text" onChange={(event) => setLastName(event.target.value)} className="form-control" id="inputPatientName" placeholder="Lowanshi" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" id="email" placeholder="name@gmail.com" />
                                </div>

                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Phone Number</label>
                                    <input type="number" onChange={(event) => setPhoneNumber(event.target.value)} className="form-control" id="inputPhone" placeholder="XXXXXXXXXX" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" id="password" placeholder="*******" />
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
                                    <label >Role</label>
                                    <select onChange={(event) => setRole(event.target.value)} name={role} className="form-control wide" >
                                        <option>Select</option>
                                        <option value="doctor">Doctor </option>
                                        <option value="admin">Admin </option>

                                    </select>
                                </div>
                            </div>
                            <div className="btn-box">
                                <button type="submit" className="btn ">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}