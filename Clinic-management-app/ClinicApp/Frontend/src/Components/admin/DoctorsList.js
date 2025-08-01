import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import api from "../../api";

export default function DoctorList() {
    const { token, firstName} = useSelector((store) => store.user);
    const [doctorList, setDoctortList] = useState([]);
    const navigate = useNavigate();
    const config = {
        headers: {
        'Authorization' : `Bearer ${token}` }
    };
   
    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        let response = await api.get("/doctors/getAll", config);

        if (response.data) {
            setDoctortList(response.data);
        }
        else {
            toast.error("Oops something went wrong");
        }
    }

    const deleteDoctor = async (id) => {
        let response = await api.delete(`/doctors/delete/${id}`, config);

        if (response.data) {
            console.log(response.data);
            toast.success("doctor deleted...");
            let index = doctorList.findIndex((obj) => obj._id === id);
            doctorList.splice(index, 1);
            setDoctortList([...doctorList]);
        }
        else {
            toast.error("Oops, doctor not deleted");
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
                    <th>Role</th>
                    <th>Admin</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {doctorList.map((doctor, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{doctor._id}</td>
                    <td>{doctor.firstName}&nbsp;{doctor.lastName}</td>
                    <td>{doctor.phoneNumber}</td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.role}</td>
                    <td>{firstName}</td>
                    <td>
                    <button className="btn btn-outline-primary mr-3" onClick={() => navigate('/view-doctor', {
                            state: {
                                doctorId: doctor._id,
                            }
                        })}>View Details</button>
                    <button className="btn btn-outline-info mr-3" onClick={() => navigate('/update-doctor', {
                            state: {
                                doctorId: doctor._id,
                            }
                        })}>Update</button>
                        <button className="btn btn-outline-danger" onClick={() => deleteDoctor(doctor._id)}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>
    </>
}