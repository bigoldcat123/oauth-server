export default function Title({
    children
}:{
    children:string
}) {
  return (
    <>
      <div className=" text-2xl border-b-2 py-2" >
        {children}
      </div>
    </>
  );
}