
import Banner from '../banner/Banner';
import Appointment from '../Appointment/Appointment';
import Treatment from '../treatment/Treatment';
import About from '../about/About';
import Doctors from '../doctors/Doctors';
import Testimonial from '../testimonial/Testimonial';
import Contact from '../Contact/Contact.js';


export default function Home() {
    return <>
        <Banner />
        <Appointment />
        <About />
        <Treatment />
        <Doctors />
        <Testimonial />
        <Contact />
    </>
}