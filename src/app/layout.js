"use client"
import { inter } from "./ui/font";

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
