import Logout from "@/components/logout";
import UserProfile from "./components/userProfile";
import Link from "next/link";

export default function NaviBar() {
    return (
        <>
            <div className=" h-16 border-b-2 fixed inset-0 bg-background/55 backdrop-blur-md flex lg:px-32 px-2 items-center justify-between">
                <div className=" flex flex-row text-xl">
                    <div><Link href={'/dashboard'}>Home</Link></div>
                </div>
                <div><Link className=" text-xl" href={'/dashboard/newapp'}>Create A New App</Link></div>
                <UserProfile/>
            </div>
            <div className=" min-h-16"></div>
        </>
    );
}