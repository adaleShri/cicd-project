import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function Profile() {
    const { id, firstName, lastName, phoneNumber, email, gender } = useSelector((store) => store.user);
    return <>
        <ToastContainer />
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form>
                            <h4>
                                PROFI<span>LE</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="Id">ID</label>
                                    <input type="text" value={id} className="form-control" id="patientId" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPatientName">First Name </label>
                                    <input type="text" value={firstName} className="form-control" id="inputPatientName" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="inputPhone">Last Name</label>
                                    <input type="text" value={lastName} className="form-control" id="inputPhone" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" value={email} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Phone</label>
                                    <input type="text" value={phoneNumber} className="form-control" id="email" readOnly="readonly" />
                                </div>
                                <div className="form-group col-lg-4">
                                    <label htmlFor="email">Gender</label>
                                    <input type="text" value={gender} className="form-control" id="email" readOnly="readonly" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}