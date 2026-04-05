import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { SiteFooter, SiteHeader } from '@/components/nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Code Learning Guide',
  description: '教程主线优先，源码真实性后置核验。',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-frame">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
