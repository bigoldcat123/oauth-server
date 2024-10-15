'use server'

import { COOKIE_SESSION_NAME } from "@/constant"
import { signJwt } from "@/lib/jwt"
import { data_user } from "@prisma/client"
import { cookies } from "next/headers"

export async function checkAuthorization() {
    return true
}
export async function setCookie(user:data_user) {
    const jwt = signJwt({
        id:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar
    })
    cookies().set(COOKIE_SESSION_NAME,jwt)
}