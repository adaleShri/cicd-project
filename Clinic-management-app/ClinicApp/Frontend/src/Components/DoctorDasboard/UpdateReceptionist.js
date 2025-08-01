import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import api from "../../api";

export default function UpdateReceptionist() {
    const navigate = useNavigate();
    const location = useLocation();
    const { rId} = location.state;
    const [receptionist, setReceptionist] = useState({});
    const { token, role } = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName]= useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(null);
    const [clinicAddress, setClinicAddress] = useState();
    const config = {
        headers: { Authorization: "Bearer " + token }
    };
    const updateRecord = async (event) => {
        event.preventDefault();
        let response =await api.put(`/receptionist/update/${rId}`,
        {firstName, lastName, email, password, phoneNumber, clinicAddress }, config);

        if(response.data.message){
            console.log(response.data);
            toast.success("details updated..")
            navigate('/reception-list');
        }
        else{
            toast.error("unable to update details");
        }
    }

    const getReceptionistData=async(id)=>{
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.get(`/receptionist/getById/${id}`, config);
        if(response.data){
            setReceptionist(response.data.receptionist);
        }
        else{
            console.log(response.data)
        }
    }

    
    useEffect(()=>{
        getReceptionistData(rId);
    },[]);

    return <>
    <ToastContainer/>
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={updateRecord} >
                            <h4>
                                Update <span>Receptionist</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name</label>
                                    <input defaultValue={receptionist.firstName} onChange={(event) => setFirstName(event.target.value)} type="text" className="form-control" placeholder={receptionist.firstName} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">Last Name</label>
                                    <input defaultValue={receptionist.lastName} onChange={(event)=>setLastName(event.target.value)} type="text" className="form-control" placeholder={receptionist.lastName} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Phone Number</label>
                                    <input defaultValue={receptionist.phoneNumber} type="text" onChange={(event) => setPhoneNumber(event.target.value)} className="form-control" placeholder={receptionist.phoneNumber} />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputEmail"> Email</label>
                                    <input defaultValue={receptionist.email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control"  placeholder={receptionist.email} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPassword">Password</label>
                                    <input  type="text" className="form-control" onChange={(event) => setPassword(event.target.value)}  placeholder={receptionist.password} />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputAddress">Clinic Address</label>
                                    <input defaultValue={receptionist.clinicAddress} onChange={(event) => setClinicAddress(event.target.value)} type="text" className="form-control"  placeholder={receptionist.clinicAddress} />
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