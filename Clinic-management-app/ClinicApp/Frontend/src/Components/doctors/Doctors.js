
export default function Doctors(){
    return <>
        <section className="team_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Our <span>Doctors</span>
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src="images/team1.jpg" />  
                        <h1>Dr. Jenny</h1>  
                        <h3>MBBS</h3>
                     </div>
                     
                    <div className="col-md-4 text-center">
                        <img src="images/team2.jpg" />  
                        <h1>Dr. Aakanksha</h1>  
                        <h3>MBBS</h3>
                     </div>
                     
                    <div className="col-md-4 text-center">
                        <img src="images/team3.jpg" />
                        <h1>Dr. Morco</h1>  
                        <h3>MBBS</h3>  
                     </div>
                </div>
            </div>
        </section>
    </>
}