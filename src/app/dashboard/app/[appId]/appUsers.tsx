'use client'
import { clearAllUsers } from "@/actions/dao/app";
import { Button } from "@/components/ui/button";
import { data_app_user } from "@prisma/client";
import { useState } from "react";

export default function AppUsers({
  users,
  appId
}:{
  users:data_app_user[],
  appId:string
}) {
  const [userList, setUserList] = useState(users)
  function revokeAllTokens() {
    clearAllUsers(appId).then(res => {
      if (res) {
        setUserList([])
      }
    })
  }
  return (
    <>
      <div className=" flex flex-row justify-between border-b-2 py-2">
        <div>{userList.length} Users</div>
        <div><Button onClick={() => {revokeAllTokens()}} size={'sm'} variant={'destructive'} >Revoke all tokens</Button></div>
      </div>
    </>
  );
}