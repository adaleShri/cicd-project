import { useSelector } from "react-redux";
import api from "../../api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReceptionProfile() {
    const location = useLocation();
    const [receptionist, setReceptionist] = useState({});
    const { rId } = location.state;
    const { token } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const getReceptionistData = async (id) => {
        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        let response = await api.get(`/receptionist/getById/${id}`, config);
        if (response.data) {
            setReceptionist(response.data.receptionist);
        }
        else {
            console.log(response.data)
        }
    }


    useEffect(() => {
        getReceptionistData(rId);
    }, []);

    return <>
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form >
                            <h4>
                                Receptionist<span> Details</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="Id">ID</label>
                                    <input type="text" value={receptionist._id} className="form-control" id="patientId" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" value={receptionist.firstName} className="form-control" id="inputPatientName" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Last Name</label>
                                    <input type="text" value={receptionist.lastName} className="form-control" id="inputPhone" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" value={receptionist.email} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Phone</label>
                                    <input type="text" value={receptionist.phoneNumber} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Gender</label>
                                    <input type="text" value={receptionist.gender} className="form-control" id="email" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Branch</label>
                                    <input type="text" value={receptionist.clinicAddress} className="form-control" id="email" readOnly="readonly" />
                                </div>

                            </div>
                            <div className="btn-box">
                                <button className="btn btn-info ml-3" onClick={() => navigate('/update-receptionist', {
                                    state: {
                                        rId: receptionist._id,
                                    }
                                })}>Update</button>
                            </div>
                            <div className="btn-box">

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}