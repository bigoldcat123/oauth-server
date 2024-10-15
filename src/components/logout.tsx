'use client'
import { LogoutAction } from "@/actions/auth";
import { Button } from "./ui/button";

export default function Logout() {
  return (
    <>
      <Button onClick={() => LogoutAction()}>Logout</Button>
    </>
  );
}