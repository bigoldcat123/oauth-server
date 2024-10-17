import { COOKIE_SESSION_NAME } from '@/constant'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const privateKey = process.env.AUTH_SECRET as string
export type User = {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    avatar?: string | null,
}  | null 
export function signJwt(payload: User, options: jwt.SignOptions = {}) {
    return jwt.sign(payload as any, privateKey, {
        ...(options && options),
        algorithm: "HS256",
        expiresIn: "30d",
    })
}

export function verifyJwt(clientId?: string): User {
    const token = cookies().get(COOKIE_SESSION_NAME)?.value
    if (!token) { redirect('/login') }
    else {
        try {
            return jwt.verify(token, privateKey) as User
        } catch (error) {
            cookies().delete(COOKIE_SESSION_NAME)
            ///login?callbackUrl=${callbackUrl}
            if(clientId){
                const callbackUrl = '/authorize?client_id=' + clientId
                redirect(`/login?callbackUrl=${encodeURI(callbackUrl)}`)
            }else {
                redirect('/login')
            }
        }
    }
}

/**
 * only node env
 * @returns boolean
 */
export function isVerifiedJwt(): boolean {
    try {
        verifyJwt()
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export function getJwtPayload(token?:string): User {
    if(!token){
        return null
    }
    try {
        const user = jwt.verify(token, privateKey) as User
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}