"use client"
import { AppBar } from '@mui/material'
import { Inter } from 'next/font/google'
// import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({children}) {
  return (
    <html lang="en">
      <h1>Day la Admin page</h1>  
      <body className={inter.className}>{children}</body>
    </html>
  );
}
