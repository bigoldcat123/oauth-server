import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{
    params
}:{
    params:{
        filename:string
    }
}) => {
    const fileLocation = process.env.FILE_LOCATION
    
    const file = readFileSync(`${fileLocation}${params.filename}`)
    return new NextResponse(file)
}