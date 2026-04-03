import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { SiteHeader } from '@/components/nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Code Learning Guide',
  description: '基于 claude-code-analysis 的全量知识学习站原型',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-frame">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
