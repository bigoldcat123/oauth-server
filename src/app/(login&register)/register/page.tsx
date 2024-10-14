import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Register from "./register";
import Link from "next/link";

export default function RegisterPage({
  searchParams
}:{
  searchParams:{
    callbackUrl?:string
  }
}) {
  return (
    <>
      <Card className=" w-[24rem]">
        <CardHeader>Register</CardHeader>
        <CardContent>
          <Register />
        </CardContent>
        <CardFooter>
          <Link href={'/login' + (searchParams.callbackUrl ? `?callbackUrl=${searchParams.callbackUrl}` :'')}>go to Login</Link>
        </CardFooter>
      </Card>
    </>
  );
}