import { auth } from "@/actions/auth";
import { getUserBy } from "@/actions/dao/user";
import UpdateUserInfo from "./updateUserInfo";
import Title from "./title";

export default async function ProfilePage() {
  const user = await getUserBy('id',(await auth())!.user!.id as string)
  await new Promise((e)=>setTimeout(()=>e(0),1000))
  if(!user){
    return <div>user not found</div>
  }
  return (
    <>
      <Title>Profile</Title>
      <UpdateUserInfo user={user} />
    </>
  );
}