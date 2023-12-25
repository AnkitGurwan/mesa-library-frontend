import Footer from "../IntroPage/footer";
import Navbar from "../IntroPage/homeNavBar";
import Title from "../Title/Title";

const Events = () => {
    return ( 
        <div>
            <Navbar/>
            <Title title={"Events"} quote={"It's not about the event itself, it's about creating a memorable experience for your audience."}/>
            <Footer/>
        </div>
     );
}
 
export default Events;