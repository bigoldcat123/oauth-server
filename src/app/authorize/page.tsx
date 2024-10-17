import { AuthorizeAction, AuthorizeSuccessAction } from "@/actions/auth";
import { getAppById } from "@/actions/dao/app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { User, verifyJwt } from "@/lib/jwt";
import Link from "next/link";
import AuthorizeBtns from "./handleAuth";

export default async function AuthorizationPage({
  searchParams
}: {
  searchParams: {
    client_id: string
  }//f9ae1dd6-8b90-11ef-b4da-0242ac110002
}) {//http://localhost:3000/authorize?client_id=f9ae1dd6-8b90-11ef-b4da-0242ac110002
  const app = await getAppById(searchParams.client_id)
  if (!app) {
    return <div>no such app..</div>
  }
  const currentUser: User = verifyJwt(searchParams.client_id)
  
  
  console.log(app?.data_app_user.filter(x => x.user_id == currentUser?.id).length == 0);
  
  //已授权
  if (!(app?.data_app_user.filter(x => x.user_id == currentUser?.id).length == 0)) {
    await AuthorizeSuccessAction(app!, currentUser)
  }

  
  return (
    <>
      <Card className=" w-96">
        <CardContent className=" border-b-2">
          <div>
            <div className=" py-2">
              <p><span className=" font-bold">{app.homepage_url}</span> by <span className=" text-blue-500">{app.data_user?.name}</span></p>
              <p className=" text-sm text-gray-500">wants to access your <span className=" font-bold"> {currentUser?.name}</span> account</p>
            </div>
            <div className=" py-2">
              <p>Personal user data</p>
              <p className=" text-sm text-gray-500">Full access</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" pb-0" >
          <AuthorizeBtns app={app} currentUser={currentUser} />
        </CardFooter>
      </Card>
    </>
  );
}