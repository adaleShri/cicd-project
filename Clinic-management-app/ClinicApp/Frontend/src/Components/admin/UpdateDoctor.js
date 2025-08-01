import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function UpdateDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const { doctorId} = location.state;
    const { token } = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName]= useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(null);
    const [doctor, setDoctor]=useState({});
    const config = {
        headers: { Authorization: "Bearer " + token }
    };
    const updateRecord = async (event) => {
        event.preventDefault();
        let response =await api.put(`/doctors/update/${doctorId}`,
        {firstName, lastName, email, password, phoneNumber}, config);

        if(response.data.message){
            console.log(response.data);
            toast.success("details updated..")
            navigate('/reception-list');
        }
        else{
            toast.error("unable to update details");
        }
    }

    const getDoctorData=async(id)=>{
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.get(`/doctors/getById/${id}`, config);
        if(response.data){
            setDoctor(response.data.doctor);
        }
        else{
            console.log(response.data)
        }
    }

    useEffect(()=>{
        getDoctorData(doctorId);
    },[]);

    return <>
    <ToastContainer/>
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={updateRecord} >
                            <h4>
                                Update <span>Doctor</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name</label>
                                    <input defaultValue={doctor.firstName} onChange={(event) => setFirstName(event.target.value)} type="text" className="form-control" placeholder={doctor.firstName} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">Last Name</label>
                                    <input defaultValue={doctor.lastName} onChange={(event)=>setLastName(event.target.value)} type="text" className="form-control" placeholder={doctor.lastName} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Phone Number</label>
                                    <input defaultValue={doctor.phoneNumber} type="text" onChange={(event) => setPhoneNumber(event.target.value)} className="form-control" placeholder={doctor.phoneNumber} />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputEmail"> Email</label>
                                    <input defaultValue={doctor.email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control"  placeholder={doctor.email} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input  type="text" className="form-control" onChange={(event) => setPassword(event.target.value)}  placeholder={doctor.password} />
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