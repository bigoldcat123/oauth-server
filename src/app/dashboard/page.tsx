
import { listApp } from "@/actions/dao/app";
import Logout from "@/components/logout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/lib/hooks/useAuth";
import { Divide } from "lucide-react";
import Link from "next/link";

export default async function DashBoardPage() {
  const apps = await listApp()
  return (
    <>
      <div className=" container mx-auto">
        <h1>My Apps</h1>
        <div className=" grid md:grid-cols-3 grid-cols-1 gap-4">
          {
            apps.map(app => {
              return (
                <div key={app.id}>
                  <Link href={`/dashboard/app/${app.id}`}>
                    <Card className=" cursor-pointer h-56">
                      <CardHeader className=" ">
                        <CardTitle>{app.name}</CardTitle>
                      </CardHeader>
                      <CardContent className=" break-words clip" >
                         {app.app_description}
                      </CardContent>
                    </Card>
                  </Link>
                </div>

              )
            })
          }
        </div>
      </div>
    </>
  );
}