import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signin from './Components/signin/Signin';
import Signup from './Components/admin/AddDoctor';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Profile/Profile';
import AddReceptionist from './Components/DoctorDasboard/AddReceptionist';
import ReceptionList from './Components/DoctorDasboard/ReceptionList';
import About from './Components/about/About';
import Authenticate from './Components/Protected-route/Authenticate';
import Header from './Components/header/Header';
import Treatment from './Components/treatment/Treatment';
import Doctors from './Components/doctors/Doctors';
import Testimonial from './Components/testimonial/Testimonial';
import Contact from './Components/Contact/Contact';
import UpdateReceptionist from './Components/DoctorDasboard/UpdateReceptionist';
import AddPatient from './Components/Patient/AddPatient';
import AppointmentList from './Components/DoctorDasboard/AppointmentListDoctor';
import PatientListDoctor from './Components/admin/AppointmentListAdmin';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/scroll-button/ScrollToTop';
import UpdatePatient from './Components/Patient/UpdatePatient';
import DoctorPanel from './Components/admin/DoctorPanel';
import PatientPanel from './Components/admin/PatientPanel';
import ReceptionistPanel from './Components/admin/ReceptionistPanel';
import PatientListReceptionist from './Components/receptionist/PatientsListReceptionist';
import PatientAppointmentDoctor from './Components/DoctorDasboard/PatientAppointmentDoctor';
import AppointmentListReceptionist from './Components/receptionist/AppointmnetListReceptionist';
import DoctorList from './Components/admin/DoctorsList';
import AddNewPatients from './Components/admin/AddNewPatients';
import ReceptionListAdmin from './Components/admin/ReceptionistListAdmin';
import PatientListAdmin from './Components/admin/PatientListAdmin';
import AppointmentListDoctor from './Components/DoctorDasboard/AppointmentListDoctor';
import AppointmentListAdmin from './Components/admin/AppointmentListAdmin';
import AddDoctor from './Components/admin/AddDoctor';
import UpdateDoctor from './Components/admin/UpdateDoctor';
import ReceptionProfile from './Components/admin/ReceptionProfile';
import DoctorProfile from './Components/admin/DoctorProfile';
import PatientProfile from './Components/admin/PatientProfile';

function App() {
  return <>
     <Header/>
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route path='/sign-in' element={<Signin/>} />
     <Route path='/add-doctor' element={<Authenticate><AddDoctor/></Authenticate>} />
     <Route path='/profile' element={<Authenticate><Profile/></Authenticate>} />
     <Route path='/add-receptionist' element={<Authenticate><AddReceptionist/></Authenticate>} />
     <Route path='/reception-list' element={<Authenticate><ReceptionList/></Authenticate>} />
     <Route path='/update-receptionist' element={<Authenticate><UpdateReceptionist/></Authenticate>} />
     <Route path='/add-appointment' element={<Authenticate><AddPatient/></Authenticate>} />
     <Route path='/appointment-list-doctor' element={<Authenticate><AppointmentListDoctor/></Authenticate>} />
     <Route path='/appointment-list-admin' element={<Authenticate><AppointmentListAdmin/></Authenticate>} />
     <Route path='/update-patient' element={<Authenticate><UpdatePatient/></Authenticate> } />
     <Route path='/doctor-panel' element={<Authenticate><DoctorPanel/></Authenticate>} />
     <Route path='/patient-panel' element={<Authenticate><PatientPanel/></Authenticate> } />
     <Route path='/receptionist-panel' element={<Authenticate><ReceptionistPanel/></Authenticate> } />
     <Route path='/patient-list-receptionist' element={<Authenticate><PatientListReceptionist/></Authenticate> } />
     <Route path='/appointment-list-receptionist' element={<Authenticate><AppointmentListReceptionist/></Authenticate>} />
     <Route path='/patient-appointment-doctor' element={<Authenticate><PatientAppointmentDoctor/></Authenticate> } />
     <Route path='/doctor-list' element={<Authenticate><DoctorList/></Authenticate> } />
     <Route path='/add-new-patient' element={<Authenticate><AddNewPatients/></Authenticate> } />
     <Route path='/reception-list-admin' element={<Authenticate><ReceptionListAdmin/></Authenticate>} />
     <Route path='/patient-list-admin' element={<Authenticate><PatientListAdmin/></Authenticate>} />
     <Route path='/update-doctor' element={<Authenticate><UpdateDoctor/></Authenticate>} />

     <Route path='/view-receptionist' element={<Authenticate><ReceptionProfile/></Authenticate>} /> 
     <Route path='/view-doctor' element={<Authenticate><DoctorProfile/></Authenticate>} />
     <Route path='/view-patient' element={<Authenticate><PatientProfile/></Authenticate>} />
     <Route path='/about' element={<About/>} />
     <Route path='/treatment' element={<Treatment/>} />
     <Route path='/doctors' element={<Doctors/>} />
     <Route path='/testimonial' element={<Testimonial/>} />
     <Route path='/contact' element={<Contact/>} />
    </Routes>
    <Footer/>
    <ScrollToTop/>
  </>
}

export default App;
