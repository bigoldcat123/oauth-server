import { getAppById, getAppSecrets, getAppUsers } from "@/actions/dao/app";
import UpdateForm from "./updateForm";
import AppSecrets from "./appSecrets";
import AppUsers from "./appUsers";

export default async function Home({
  params
}: {
  params: {
    appId: string
  }
}) {
  const app = await getAppById(params.appId)
  const secrets = await getAppSecrets(params.appId)
  const users = await getAppUsers(params.appId)
  if (!app) {
    return (
      <div>
        something wrong!
      </div>
    )
  }
  return (
    <div className=" w-96 mx-auto">
      <div className=" border-b-2 py-2 ">
        <h1 className=" text-xl">
          Client Id
        </h1>
        <h2>
          {params.appId}
        </h2>
      </div>

      <AppUsers users={users} appId={params.appId} />
      <AppSecrets secrets={secrets} appId={params.appId} />
      <UpdateForm app={app} />
    </div>
  );
}