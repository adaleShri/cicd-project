import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function ReceptionistPanel() {
    //const { id, firstName, lastName, phoneNumber, email, gender } = useSelector((store) => store.user);
    return <>
        <ToastContainer />
        <section className="book_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form >
                            <h4>
                                RECEPT<span>IONIST</span>
                            </h4>
                            <div className="form-row ">
                                <div className="form-group col-lg-6">
                                    <div className="panel-icon">
                                        <i class='bx bx-user-plus'></i>
                                        <Link to={"/add-receptionist"} className="btn btn-secondary ">Add Receptionist</Link>
                                    </div>
                                </div>
                                <div className="form-group col-lg-6">
                                    <div className="panel-icon">
                                        <i class='bx bxs-user-detail'></i>
                                        <Link to={"/reception-list-admin"} className="btn btn-info ">View All Receptionists</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="form-group col-lg-4">

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}