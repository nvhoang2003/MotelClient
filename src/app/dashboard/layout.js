"use client"
import { useEffect } from "react";
import AdminAppBar from "../ui/dashboard/app-bar.js";
import { SnackbarProvider } from "notistack";
import { PATH_OWNER, PATH_TENANT } from "../../routes/path.js";

export default function AdminLayout({ children }) {
    useEffect(() => {
        var role = localStorage.getItem("role"); 

        if (role != "admin") {
            if (role == "tennant") {
                window.location.href = PATH_TENANT.root;
            } else {
                window.location.href = PATH_OWNER.root;
            }
        }
    })

    return (
        <SnackbarProvider>
            <div>
                <div>
                    <AdminAppBar />
                </div>
                <div>{children}</div>
            </div>
        </SnackbarProvider>
    )
}