"use client"

import { useEffect } from "react";
import HomeAppBar from "../ui/home/app-bar"
import { PATH_DASHBOARD, PATH_OWNER } from "../../routes/path";

export default function TenantLayout({children}){
    return (
        <div>
            <div>
                <HomeAppBar/>
            </div>
            <div>{children}</div>
        </div>
    )
}