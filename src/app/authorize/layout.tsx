export default function AuthorizationLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className=" h-screen flex flex-col justify-center items-center">
                {children}
            </div>
        </>
    )
}