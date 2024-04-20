import OwnerAppBar from "../ui/owner/app-bar"

export default function OwnerLayout({children}){
    return (
        <div>
            <div>
                <OwnerAppBar/>
            </div>
            <div>{children}</div>
        </div>
    )
}