'use server'

import { COOKIE_SESSION_NAME } from "@/constant"
import { data_user } from "@prisma/client"
import { cookies } from "next/headers"

export async function checkAuthorization() {
    return true
}
export async function setCookie(user:data_user) {
    cookies().set(COOKIE_SESSION_NAME,JSON.stringify(user))
}