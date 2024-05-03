"use client"
import AdminAppBar from "../ui/dashboard/app-bar.js";
import { SnackbarProvider } from "notistack";

export default function AdminLayout({ children }) {
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