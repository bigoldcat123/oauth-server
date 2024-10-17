
import { listApp } from "@/actions/dao/app";
import Logout from "@/components/logout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
                <Link key={app.id} href={`/dashboard/app/${app.id}`}>
                  <Card  className=" cursor-pointer">
                    <CardHeader className=" border-b-2 text-xl">
                      <h2>{app.name}</h2>
                    </CardHeader>
                    <CardContent>
                      <p>{app.app_description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          }
        </div>
      </div>
    </>
  );
}