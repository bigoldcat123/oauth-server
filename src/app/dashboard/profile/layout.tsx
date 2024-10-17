import SideBar from "./sideBar"

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className=" pl-2 h-screen flex flex-col">
                <div className=" text-3xl pb-4">Settings</div>
                <div className=" flex-1 flex flex-row">
                    <SideBar/>
                    <main className=" flex-1 p-2 ">
                        {children}
                    </main>
                </div>
            </div>

        </>
    )
}