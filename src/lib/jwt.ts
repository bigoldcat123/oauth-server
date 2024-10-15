import { COOKIE_SESSION_NAME } from '@/constant'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const privateKey = process.env.AUTH_SECRET as string
export type User = {
    id?:string | null,
    name?:string | null,
    email?:string | null,
    avatar?:string | null,
} | any | null
export function signJwt(payload: User, options: jwt.SignOptions = {}) {
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: "HS256",
        expiresIn: "30d",
    })
}

export function verifyJwt(token: string):User {
    try{
       return jwt.verify(token, privateKey) as User
    }catch(error) {
        cookies().delete(COOKIE_SESSION_NAME)
        redirect('/login')
    }

}

/**
 * only node env
 * @returns boolean
 */
export function isVerifiedJwt():boolean {
    const cookie = cookies()
    const session = cookie.get(COOKIE_SESSION_NAME)?.value
    if(session == null) return false
    try {
        verifyJwt(session)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}