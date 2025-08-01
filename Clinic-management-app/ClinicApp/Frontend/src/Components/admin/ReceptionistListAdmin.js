import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import api from "../../api";

export default function ReceptionListAdmin() {
    const { token, firstName } = useSelector((store) => store.user);
    const [receptionistList, setReceptionistList] = useState([]);
    const navigate = useNavigate();
    const config = {
        headers: {
        'Authorization' : `Bearer ${token}` }
    };
   
    useEffect(() => {
        loadReceptionist();
    }, []);
    const loadReceptionist = async () => {
        let response = await api.get("/receptionist/all", config);

        if (response.data) {
            setReceptionistList(response.data);
            
        }
        else {
            toast.error("Oops something went wrong");
        }
    }

    const deleteReceptionist = async (id) => {
        let response = await api.delete(`/receptionist/delete/${id}`, config);

        if (response.data) {
            console.log(response.data);
            toast.success("Receptionist deleted...");
            let index = receptionistList.findIndex((obj) => obj._id === id);
            receptionistList.splice(index, 1);
            setReceptionistList([...receptionistList]);
        }
        else {
            toast.error("Oops, receptionist not deleted");
        }
    }

    return <>
        <ToastContainer />
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Doctor</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {receptionistList.map((receptionist, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{receptionist._id}</td>
                    <td>{receptionist.firstName}&nbsp;{receptionist.lastName}</td>
                    <td>{receptionist.phoneNumber}</td>
                    <td>{receptionist.gender}</td>
                    <td>{receptionist.clinicAddress}</td>
                    <td>{firstName}</td>
                    <td>
                        <button className="btn btn-outline-primary mr-3" onClick={() => navigate('/view-receptionist', {
                            state: {
                                rId: receptionist._id,
                            }
                        })}>View Details</button>
                        <button className="btn btn-outline-info mr-3" onClick={() => navigate('/update-receptionist', {
                            state: {
                                rId: receptionist._id,
                            }
                        })}>Update</button>
                        <button className="btn btn-outline-danger" onClick={() => deleteReceptionist(receptionist._id)}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>
    </>
}