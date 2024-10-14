'use server'

import db from "@/db"
import { Prisma } from "@prisma/client"

type UserSearchFiled  = 'email' | 'name' | 'id'
export const getUserBy = async (filed:UserSearchFiled,filedValue: string) => {
    const user = await db.data_user.findFirst({where:{[filed]:filedValue}})
    return user
}

export const  createNewUser = async (user:Prisma.data_userCreateInput) => {
   const u = await db.data_user.create({
        data: user
    })
    return u
}