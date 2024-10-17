'use client'
import Upload from "@/components/ui/upload";
import { data_user } from "@prisma/client";
import { useState } from "react";
import { z } from "zod"
 
const formSchema = z.object({
  name: z.string().min(2).max(50),
})

export default function UpdateUserInfo(
    {
        user
    }:{
        user:data_user
    }
) {
    const [avatar,setAvatar] = useState<string>(user.avatar ?? '')
    function onFileChange (file:File[]) {
        const f:File = file[0]
        setAvatar(URL.createObjectURL(f))
        //TODO update
    }
  return (
    <>
      <div className=" flex md:flex-row-reverse flex-col">
        <div className=" flex-1">
            <Upload className=" size-28 mx-auto mt-10" onChoseFile={onFileChange}>
               {avatar && <img className=" size-full object-cover" src={avatar}></img>}
            </Upload>
        </div>
        <div className=" flex-[2]">

        </div>
      </div>
    </>
  );
}