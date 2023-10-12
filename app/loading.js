 
 
import Spinner from "../components/Spinner"
export default function Loading() {
   
    return (
        <div className="flex h-[calc(100vh_-_85px)] w-full justify-center items-center">
               <Spinner/>
        </div>
    )
}