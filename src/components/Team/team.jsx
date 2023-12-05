import Footer from "../IntroPage/footer";
import Navbar from "../IntroPage/homeNavBar";
import Card from "./teamCard";

const Team = () => {
    return ( 
        <div className="flex flex-col w-full justify-center align-center text-center">
            <Navbar/>
            <div className="flex flex-col w-full justify-center align-center text-center mt-4 md:mt-0 mb-0">
                <div className="text-[32px] md:text-[40px] font-bold text-[#303030] ">Our Team</div>
                <div className="px-12 md:px-28 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-0 md:gap-y-4">
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#00efbf"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#febc01"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#fdb9a5"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#007efd"} position={"Web Developer"}/>
                </div>
            </div>
            <Footer/>
        </div>
     );
}
 
export default Team;