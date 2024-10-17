import { getJwtPayload, verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
    const token = req.headers.get("Authorization")?.replace('Bearer ','')
    console.log(token);
    
    const user =  getJwtPayload(token)
    if(user) {
        return NextResponse.json({
            message:'success',
            code:200,
            user
        })
    }
    return NextResponse.json({
        message:'wrong token',
        code:500
    })
}