'use server'

import { cookies } from "next/headers";
import { createNewUser, getUserBy } from "./dao/user";
import { COOKIE_SESSION_NAME } from "@/constant";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { setCookie } from ".";
import { isVerifiedJwt, verifyJwt } from "@/lib/jwt";
import sendCode from "@/lib/mailSender";
import { getCodeCache, setCodeCache } from "@/lib/codeCache";

function checkPassword(pwd1?: string | null, pwd2?: string | null) {
    return pwd1 === pwd2
}
export async function LoginAction(credentials: { email: string; password: string }, callBackUrl?: string | null) {
    // console.log(credentials, callBackUrl);
    await new Promise((e) => setTimeout(() => {
        e(0)
    }, 1000))
    const user = await getUserBy('email', credentials.email)
    if (!user) {
        return 'no such user'
    }
    if (!checkPassword(credentials.password, user?.password)) {
        return 'wrong password'
    }
    setCookie(user)
    if (callBackUrl) redirect(callBackUrl)
    redirect('/dashboard')
}

export async function RegisterAction(credentials: { email: string; password: string,code:string }, callBackUrl?: string | null) {
    console.log(credentials);
    const user = await getUserBy('email', credentials.email)
    if (user) {
        return 'user already exists'
    }
    const cache = getCodeCache(credentials.email)
    if(cache?.code === credentials.code){
        
        const u = await createNewUser({
            email: credentials.email,
            name: credentials.email,
            password: credentials.password
        })
        await setCookie(u)
        if (callBackUrl) redirect(callBackUrl)
        redirect('/dashboard')
    }
    return 'wrong code'
}


export async function sendCodeAction(email: string) {
    const cache = getCodeCache(email)
    if(cache){
        return 'already sent'
    }
    const code = Math.floor(Math.random() * 1000000).toString()
    setCodeCache(email,code , Date.now() + 60 * 1000 * 5)
    const res = await sendCode(code, email)
    return res
}

export async function LogoutAction() {
    if (!isVerifiedJwt()) return
    cookies().delete(COOKIE_SESSION_NAME)
    redirect('/')
}

export async function auth() {
    const jtw = cookies().get(COOKIE_SESSION_NAME)?.value
    if (!jtw) return {
        isAuthorized: false,
        user: null
    }
    try {
        const user = verifyJwt(jtw)
        return {
            isAuthorized: true,
            user
        }
    } catch (e) {
        return {
            isAuthorized: false,
            user: null
        }
    }
}