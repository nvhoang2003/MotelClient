"use client"
import { useEffect } from "react"
import OwnerAppBar from "../ui/owner/app-bar"
import { SnackbarProvider } from "notistack"
import { PATH_DASHBOARD, PATH_TENANT } from "../../routes/path"
export default function OwnerLayout({ children }) {
    useEffect(() => {
        var role = localStorage.getItem("role"); 

        if (role != "owner") {
            if (role == "admin") {
                window.location.href = PATH_DASHBOARD.root;
            } else if (role == "tennant") {
                window.location.href = PATH_TENANT.root;
            }
        }
    })

    return (
        <SnackbarProvider >
            <div>
                <OwnerAppBar />
            </div>
            <div>{children}</div>
        </SnackbarProvider >
    )
}