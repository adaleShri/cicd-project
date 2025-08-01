import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux-config/UserSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function Signin() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Signin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data) {
                toast.success("Sign In Success....");
                let email = response.data.user.email;
                let token = response.data.token;
                let firstName = response.data.user.firstName;
                let lastName = response.data.user.lastName;
                let id = response.data.user._id;
                let phoneNumber = response.data.user.phoneNumber;
                let role = response.data.user.role;
                let gender = response.data.user.gender;
                dispatch(setUser({ email, token, id, firstName, lastName, phoneNumber, role, gender }));
                navigate("/profile");
            }
        }
        catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.error || "Sign In failed....");
            }
            else {
                toast.error("Sign In failed....");
            }
        }
    }
    
    return <>
        <ToastContainer />
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={Signin}>
                            <h4>
                                Sign <span>In</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputSymptoms">Email</label>
                                    <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="name@gmail.com" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" id="password" placeholder="*******" />
                                </div>
                            </div>
                            <div className="btn-box">
                                <button type="submit" className="btn ">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}