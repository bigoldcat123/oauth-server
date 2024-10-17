'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sideItems = [
    {
        name: 'Profile',
        link: '/dashboard/profile'
    },
    {
        name: 'Account',
        link: '/dashboard/profile/accounts'
    }
]
export default function SideBar() {
    const pathname = usePathname()

    return (
        <>
            <div className=" w-64">
                {
                    sideItems.map(x =>
                        <Link href={x.link} key={x.name} className=" ">
                            <div className=" flex hover:bg-zinc-600 rounded-sm">
                                <div className={cn('pr-2',
                                    {
                                        'opacity-0': pathname !== x.link
                                    }
                                )}>👉</div>
                                <div>{x.name}</div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    );
}