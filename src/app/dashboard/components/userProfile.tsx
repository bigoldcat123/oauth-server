'use client'
import { LogoutAction } from "@/actions/auth";
import Logout from "@/components/logout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function UserProfile() {
    const currentUser = useAuth()
    return (
        <>
               {currentUser ?
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className=" flex flex-row items-center gap-x-2  cursor-pointer">
                            <div className="w-10 h-10 aspect-square rounded-full bg-green-200"></div>
                            <div>
                                <p>{currentUser.user?.name}</p>
                                <p>{currentUser.user?.email}</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href={'/dashboard/profile'}>Settings</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={ () => LogoutAction()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <div></div>
                }
        </>
    );
}