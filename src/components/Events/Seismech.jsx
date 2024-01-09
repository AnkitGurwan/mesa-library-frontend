import React from 'react';

const SeismechPage = () => {
  return (
    <div style={{"fontFamily":"Manrope"}}>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex items-center justify-between text-white">
            <div className='flex items-center'>
                <img className='h-8 w-16 mx-4' src="https://iitg.ac.in/clubs/mesa/Seismech/img/LOGO_SEISMECH_White.png" alt='Seismech'/>
                
                <div className='text-xl'>
                    Seismech
                </div>
            </div>
    
            <div className="hidden md:flex space-x-4">
              <NavLink to="/events">Events</NavLink>
              <NavLink to="/workshops">Workshops</NavLink>
              <NavLink to="/competitions">Competitions</NavLink>
              <NavLink to="/representatives">Representatives</NavLink>
              <NavLink to="/">MESA</NavLink>
            </div>
          </div>
        </nav>

        <div>
            <section className="bg-primary text-center py-6 px-[10%] bg-gray-200">
                <div className="text-gray-700">
                    <h2 className="text-3xl font-bold mb-4">
                        Seismech - Propagation of Ideas
                    </h2>
                    <p className="text-lg ">
                        Seismech is the flagship event of the Mechanical Engineering Student Association (MESA), IIT Guwahati. It is conceptualized to develop and strengthen the engineering spirit of the students of IIT Guwahati and other North-East colleges.
                    </p>
                    <p className="text-lg mt-4">
                        Seismech'20 provides you with a wide array of events, from lectures to workshops and experiences of our accomplished alumni through talks and fun sports events.
                    </p>
                </div>
            </section>

            <div className="px-[4%] text-center bg-red-600 text-white py-4">
                <div className="">
                    <h2 className="text-3xl font-semibold mb-4">Important Notice</h2>
                    <marquee scrollamount="12" className="text-lg">
                        Seismech has been postponed until further notice. We apologize for the inconvenience caused. Participants who have registered for workshops will be given a refund in a couple of days.
                    </marquee>
                </div>
            </div>
        </div>
        </div>
      );
};
const NavLink = ({ to, children }) => {
    return (
      <a
        href={to}
        className="text-white font-medium hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
        style={{'fontFamily':'Manrope'}}
      >
        {children}
      </a>
    );
  };

export default SeismechPage;
