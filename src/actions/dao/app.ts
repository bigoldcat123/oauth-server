'use server'

import db from "@/db"
import { verifyJwt } from "@/lib/jwt"
import { data_app, Prisma } from "@prisma/client"


export const createNewApp = async (app: Prisma.data_appCreateInput) => {
    const currentUser = verifyJwt()
    try {
        const secret = crypto.randomUUID()
        let newapp = await db.data_app.create({
            data: {
                // ...app,
                name:app.name,
                app_description:app.app_description,
                homepage_url:app.homepage_url,
                authorization_callback_url:app.authorization_callback_url,
                create_time: new Date(),
                user_id: currentUser!.id,
                data_app_client_secrete: {
                    create: {
                        client_secrete: secret
                    }
                }
            }
        })
        return newapp
    } catch (error) {
        console.log(error);
        return null
    }

}

export const listApp = async () => {
    const currentUser = verifyJwt()
    const apps = await db.data_app.findMany({
        where: {
            user_id: currentUser!.id
        },
        include: {
            data_app_client_secrete: true
        }
    })
    return apps
}
export const getAppById = async (id: string) => {
    verifyJwt()
    const app = await db.data_app.findFirst({
        where: {
            id
        },
        include:{
            data_user:true,
            data_app_user:true
        }
    })
    return app
}
export const getAppSecrets = async (appId: string) => {
    verifyJwt()
    const app = await db.data_app_client_secrete.findMany({
        where: {
            app_id: appId
        }
    })
    return app
}
export const getAppUsers = async (appId: string) => {
    const currentUser = verifyJwt()
    const app = await db.data_app_user.findMany({
        where: {
            app_id: appId,
        }
    })
    return app
}

export const deleteClientSecret = async (clientSecretId: string) => {
    const currentUser = verifyJwt()
    try {
        const r = await db.data_app_client_secrete.delete({
            where: {
                id: clientSecretId,
                data_app: {
                    data_user: {
                        id: currentUser!.id as string
                    }
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const checkaAppAdmin = async (appId: string) => {
    const currentUser = verifyJwt()
    const app = await db.data_app.findFirst({
        where: {
            id: appId
        }
    })
    return app?.user_id === currentUser!.id
}
export const generateClientSecretAction = async (appId: string) => {
    if ((await checkaAppAdmin(appId))) {
        const key = crypto.randomUUID()
        const secret = await db.data_app_client_secrete.create({
            data: {
                app_id: appId,
                client_secrete: key
            }
        })
        return secret
    }
    return null
}
export const clearAllUsers = async (appId: string) => {
    try {
        if (await checkaAppAdmin(appId)) {
            await db.data_app_user.deleteMany({
                where: {
                    app_id: appId
                }
            })
            return true
        }
        return false
    } catch (error) {
        console.log(error);
        return false
    }

}
export const deleteAppAction = async (appId: string) => {
    console.log(appId);

    if (await checkaAppAdmin(appId)) {
        try {
            await db.$transaction(async (sb) => {
                await sb.data_app_client_secrete.deleteMany({
                    where: {
                        app_id: appId
                    }
                })
                await sb.data_app_user.deleteMany({
                    where: {
                        app_id: appId
                    }
                })
                await sb.data_app.delete({
                    where: {
                        id: appId
                    }
                })
            })
        } catch (error) {
            console.log(error);
            return false
        }
        return true
    } else {
        return false
    }
}

export const updateAppAction = async (appId: string, app: Prisma.data_appUpdateInput) => {
    if (await checkaAppAdmin(appId)) {
        try {
            // const old = await getAppById(appId)

            const r = await db.data_app.update({
                where: {
                    id: appId
                },
                data: {
                    ...app
                }
            })
            return r
        } catch (error) {
            console.log(error);
            return null
        }
    }
    return null
}