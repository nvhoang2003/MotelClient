import AdminAppBar from "../ui/dashboard/app-bar.js";

export default function AdminLayout({children}){
    return (
        <div>
            <div>
                <AdminAppBar/>
            </div>
            <div>{children}</div>
        </div>
    )
}