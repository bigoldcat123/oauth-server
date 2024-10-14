'use server'

import { cookies } from "next/headers";
import { createNewUser, getUserBy } from "./dao/user";
import { COOKIE_SESSION_NAME } from "@/constant";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { setCookie } from ".";

function checkPassword(pwd1?: string | null, pwd2?: string | null) {
    return pwd1 === pwd2
}
export async function LoginAction(credentials: { email: string; password: string },callBackUrl?:string | null) {
    console.log(credentials,callBackUrl);
    const user = await getUserBy('email', credentials.email)
    if(!user){
        return 'no such user'
    }
    if (!checkPassword(credentials.password, user?.password)) {
        return 'wrong password'
    }
    setCookie(user)
    if(callBackUrl) redirect(callBackUrl)
    redirect('/dashboard')
}

export async function RegisterAction(credentials: { email: string; password: string },callBackUrl?:string | null) {
    console.log(credentials);
    const user = await getUserBy('email', credentials.email)
    if(user){
        return 'user already exists'
    }
    const u = await createNewUser(credentials)
    await setCookie(u)
    if(callBackUrl) redirect(callBackUrl)
    redirect('/dashboard')
}