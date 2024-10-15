import { auth } from "@/actions/auth"
import { useEffect, useState } from "react"
import { User } from "../jwt";

export default function useAuth() {
    const [session, setSession] = useState<{
        isAuthorized: boolean;
        user: User | null;
    } | null>(null)
    useEffect(() => {
        auth().then(res => {
            setSession(res)
        })
    }, [])
    return session
}