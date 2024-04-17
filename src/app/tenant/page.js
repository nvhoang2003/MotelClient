import React from 'react'
import RootLayout from '../layout'

page.getLayout = (page) => <RootLayout>{page}</RootLayout>
export default function page() {
  return (
    <div>This is home page</div>
  )
}
