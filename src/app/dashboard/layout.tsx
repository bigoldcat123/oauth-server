import Logout from "@/components/logout"
import NaviBar from "./NavBar"

export default function DashBoardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <NaviBar />
            {children}
        </>
    )
}