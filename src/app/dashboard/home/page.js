import React from 'react'
import AdminLayout from '../../adminLayout'

page.getLayout = (page) => <AdminLayout>{page}</AdminLayout>
export default function page() {
    return (
        <div>This is home page</div>
    )
}
