import { authCode } from "@/constant";
import db from "@/db";
import { getCodeCache } from "@/lib/codeCache";
import { signJwt, User } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
// /api/accesstoken
export const POST  = async (req:NextRequest) =>{
    const {code,clientId,clientSecret} = await req.json()
    const user:User = getCodeCache(authCode + code)
    if(!user){
        return NextResponse.json({message:'wrong code',code:500})
    }
   const secret = await db.data_app_client_secrete.findFirst({
        where:{
            client_secrete:clientSecret,
            app_id:clientId
        }
    })
    if(!secret){
        return NextResponse.json({message:'wrong code',code:500})
    }
    const token = signJwt({
        id:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar
    })
    return NextResponse.json({message:'success',code:200,token})
}