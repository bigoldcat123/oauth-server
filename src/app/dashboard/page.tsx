'use client'
import Logout from "@/components/logout";
import useAuth from "@/lib/hooks/useAuth";
import { Divide } from "lucide-react";

export default function DashBoardPage() {
  return (
    <>
    <div className=" container mx-auto">
      <h1>My Apps</h1>
      {
        Array.from({length:100}).map((x,index) => <div key={index}>{100}</div>)
      }
    </div>
    </>
  );
}