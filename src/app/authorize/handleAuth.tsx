'use client'
import { AuthorizeAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/jwt";
import { data_app } from "@prisma/client";

export default function AuthorizeBtns({
    app,
    currentUser
}:{
    app:data_app,
    currentUser:User
}) {
    return (
        <>
            <div className=" w-full flex justify-between py-4 gap-x-3">
                <Button className="size-full">Cancle</Button>
                <Button onClick={() => AuthorizeAction(app,currentUser)} className=" size-full bg-green-500">Authorize</Button>
            </div>
        </>
    );
}