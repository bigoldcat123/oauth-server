'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Login from "./login";
import { COOKIE_SESSION_NAME } from "@/constant";
import { Suspense, use, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginPage() {
  const searchParams = useSearchParams()
  const callBackUrl = searchParams.get('callbackUrl')
  return (
    <>
      <Card className="w-[24rem]">
        <CardHeader>
          <p >Login to Dalem</p>
        </CardHeader>
        <CardContent>
          <Login />
        </CardContent>
        <CardFooter>
          <Link href={'/register' + (callBackUrl ? `?callbackUrl=${callBackUrl}` : '')}>create a new account</Link>
        </CardFooter>
      </Card>
    </>
  );
}

export default function P() {
  return (
    <Suspense>
      <LoginPage></LoginPage>
    </Suspense>
  )
}