import { Link } from "react-router-dom";

const NoContent = () => {
    return (  
        <div className="flex flex-col text-center align-center justify-center">
            <p className="m-5 text-5xl font-bold text-blue-500">No Content Here!</p>
            <Link className="m-2" to="/main"><button className="bg-blue-200 p-2 w-[200px] border-2 border-blue-200 rounded-3xl text-[20px] font-semibold text-gray-600">Back to Home</button></Link>
        </div>
    );
}
 
export default NoContent;