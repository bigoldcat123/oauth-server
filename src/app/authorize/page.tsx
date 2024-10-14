export default function AuthorizationPage({
  searchParams
}:{
  searchParams:{
    client_id:string
  }
}) {
  return (
    <>
      authorize- {searchParams.client_id}
    </>
  );
}