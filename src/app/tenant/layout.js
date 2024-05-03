"use client"

import { useEffect } from "react";
import TenantAppBar from "../ui/tenant/app-bar"
import { PATH_DASHBOARD, PATH_OWNER } from "../../routes/path";

export default function TenantLayout({children}){
    useEffect(() => {
        var role = localStorage.getItem("role"); 
        if ( role != "tenant") {
            if (role == "admin") {
                window.location.href = PATH_DASHBOARD.root;
            } else  {
                window.location.href = PATH_OWNER.root;
            }
        }
    })
    
    return (
        <div>
            <div>
                <TenantAppBar/>
            </div>
            <div>{children}</div>
        </div>
    )
}