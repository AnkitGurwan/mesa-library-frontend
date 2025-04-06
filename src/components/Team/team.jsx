import Footer from "../IntroPage/footer";
import Navbar from "../IntroPage/homeNavBar";
import Card from "./teamCard";
import Webcontributorcard from "./Webcontributorcard"
import team from "../../data/team";
import webcontributor from "../../data/webcontributor"
import Title from "../Title/Title";


const Team = () => {

    const president = [];
    president.push(team[0]);
    president.push(team[1]);

    const heads = [];
    for(let i=2;i<team.length;i++)
    {
        heads.push(team[i]);
    }

    const webcontributors=[];
    for(let i=0;i<webcontributor.length;i++)
    {
        webcontributors.push(webcontributor[i]);
    }

    return ( 
        <div className="flex flex-col w-full justify-center align-center text-center">
            <Navbar/>
            <Title title={"Our Team"} quote={"The strength of the team is each individual member. The strength of each member is the team."}/>
            <div className="flex flex-col w-full justify-center align-center text-center mb-0 min-h-[900px]">
                {/* <div className="text-[32px] md:text-[40px] font-bold text-[#303030] ">Our Team</div> */}
                    <div className="px-12 md:px-60 w-full grid grid-cols-1 md:grid-cols-2 place-items-center pb-6 bg-gray-50">
                        {
                            president.map((info)=>(
                                <Card key={info.id} name={info.name} image={info.image} background={info.background} position={info.position} social={info.socialMedia} />
                            ))
                        }
                    </div>
                    <div className="my-2 px-12 md:px-28 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-0 md:gap-y-4 place-items-center">
                    {
                        heads.map((info)=>(
                            <Card key={info.id} name={info.name} image={info.image} background={info.background} position={info.position} social={info.socialMedia} />
                        ))
                    }
                    </div>
                {/* <div className="px-12 md:px-28 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-0 md:gap-y-4">
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#00efbf"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#febc01"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#fdb9a5"} position={"Web Developer"}/>
                    <Card name="Devesh Kamble" image="https://imgs.search.brave.com/metSyjKuX3OGsQ5ZQpRt2PHEpJJi2KzSWJsRG58cdY0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzE1L01l/bi1CYWNrZ3JvdW5k/LVBORy1JbWFnZS5w/bmc" background={"#007efd"} position={"Web Developer"}/>
                </div> */}
                
            </div>

            <div className="text-xl lg:text-2xl font-bold drop-shadow-lg tracking-wide text-[#2e2d30] mt-12">Website Contributors</div>

                <div className="flex flex-col w-full justify-center align-center text-center mb-0 min-h-[400px]">
                    {/* <div className="text-[32px] md:text-[40px] font-bold text-[#303030] ">Our Team</div> */}
                        <div className="my-2 px-12 md:px-28 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-0 md:gap-y-4 place-items-center">
                        {
                            webcontributors.map((info)=>(
                                <Webcontributorcard key={info.id} name={info.name} image={info.image} background={info.background} position={info.position} social={info.socialMedia} />
                            ))
                        }
                        </div>
                    
                </div>
            <Footer/>
        </div>
     );
}
 
export default Team;
