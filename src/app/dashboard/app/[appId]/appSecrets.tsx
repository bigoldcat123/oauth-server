'use client'
import { deleteClientSecret, generateClientSecretAction } from "@/actions/dao/app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { data_app_client_secrete } from "@prisma/client";
import { useState } from "react";

export default function AppSecrets({
    secrets,
    appId
}: {
    secrets: data_app_client_secrete[],
    appId:string
}) {
    const [secretList, setSecretList] = useState(secrets)
    function handleDelete(sid:string){
        if(secretList.length == 1) {
            alert('Can not delete last secret')
            return
        }
        deleteClientSecret(sid).then(res => {
            setSecretList(secretList.filter(secret => secret.id !== sid))
        })
    }

    function generateNewSecret(){
        generateClientSecretAction(appId).then(res => {
            if(res){
                setSecretList([res, ...secretList])
            }
        })
    }
    return (
        <>
            <div className=" w-96 mx-auto flex flex-col gap-y-2 py-4">
                <div className=" flex flex-row justify-between">
                    <h1>App Secrets</h1>
                    <div><Button onClick={() => generateNewSecret()} size={'sm'} variant={'outline'}>Add New Secret</Button></div>
                </div>
                {
                    secretList.map(secret => {
                        return (
                            <Card key={secret.id}>
                                <CardHeader>
                                    <div className=" flex">
                                        <div>
                                            client key
                                        </div>
                                        <div>
                                            { secret.client_secrete}
                                        </div>
                                        <div className=" ml-auto flex items-center">
                                            <Button onClick={() => handleDelete(secret.id)} variant={'destructive'} size={'sm'}>delete</Button>
                                        </div>
                                    </div>

                                </CardHeader>
                            </Card>
                        )
                    })
                }

            </div>
        </>
    );
}