import Logout from "@/components/logout"
import NaviBar from "./NavBar"

export default function DashBoardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className=" h-screen flex flex-col">
                <NaviBar />
                {children}
            </div>
        </>
    )
}