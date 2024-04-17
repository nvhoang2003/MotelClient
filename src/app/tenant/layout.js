import TenantAppBar from "../ui/tenant/app-bar"

export default function TenantLayout({children}){
    return (
        <div>
            <div>
                <TenantAppBar/>
            </div>
            <div>{children}</div>
        </div>
    )
}