import Header from "src/app/components/Header"
import { Cog } from "lucide-react"
import {Separator} from "@/src/components/ui/separator";
import { auth } from "@/src/auth";

const SettingsPage= async()=>{
    const session = await auth();
    
    return(
        <>
            <Header/>
            <div className="w-[80%] justify-self-center shadow-2xl shadow-customBlue min-h-screen py-10 space-y-4">
                <div className=" flex w-full gap-x-2 justify-center text-[24px] text-customBlue font-semibold items-center h-[5vh]">
                    <Cog color="#236ed1"/>Settings
                </div>
                <Separator className="w-[75%] justify-self-center"/>
                {JSON.stringify(session)}
            </div>
        </>
    );
}
export default SettingsPage;