'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { CodeFlow, SourceReference } from '@/content/types'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'

export function SourceIndexBrowser({
  refs,
  codeFlows,
}: {
  refs: SourceReference[]
  codeFlows: CodeFlow[]
}) {
  const [filter, setFilter] = useState<'all' | 'analysis' | 'src'>('all')
  const [flowFilter, setFlowFilter] = useState<string>('all')

  const flowMap = useMemo(() => {
    return new Map(
      codeFlows.map(flow => [
        flow.id,
        new Set(flow.nodes.map(node => node.filePath)),
      ]),
    )
  }, [codeFlows])

  const filtered = useMemo(() => {
    let nextRefs = refs

    if (filter === 'analysis') {
      nextRefs = nextRefs.filter(ref => ref.path.startsWith('../analysis/'))
    }
    if (filter === 'src') {
      nextRefs = nextRefs.filter(ref => ref.path.startsWith('../src/'))
    }
    if (flowFilter !== 'all') {
      const files = flowMap.get(flowFilter)
      if (!files) {
        return []
      }
      nextRefs = nextRefs.filter(ref => files.has(ref.path.replace(/^\.\.\//, '')))
    }

    return nextRefs
  }, [filter, flowFilter, flowMap, refs])

  return (
    <div className="source-browser">
      <div className="pill-row">
        <button className={`mode-tab ${filter === 'all' ? 'mode-tab-active' : ''}`} onClick={() => setFilter('all')} type="button">
          全部
        </button>
        <button className={`mode-tab ${filter === 'analysis' ? 'mode-tab-active' : ''}`} onClick={() => setFilter('analysis')} type="button">
          原文
        </button>
        <button className={`mode-tab ${filter === 'src' ? 'mode-tab-active' : ''}`} onClick={() => setFilter('src')} type="button">
          源码
        </button>
      </div>

      <div className="pill-row">
        <button className={`mode-tab ${flowFilter === 'all' ? 'mode-tab-active' : ''}`} onClick={() => setFlowFilter('all')} type="button">
          全部主链
        </button>
        {codeFlows.map(flow => (
          <button
            className={`mode-tab ${flowFilter === flow.id ? 'mode-tab-active' : ''}`}
            key={flow.id}
            onClick={() => setFlowFilter(flow.id)}
            type="button"
          >
            {flow.title}
          </button>
        ))}
      </div>

      <div className="route-links">
        {codeFlows.filter(flow => flow.popular).map(flow => (
          <Link href={`/source?path=${encodeURIComponent(flow.nodes[0].filePath)}${flow.nodes[0].symbol ? `&symbol=${encodeURIComponent(flow.nodes[0].symbol)}` : ''}`} key={flow.id}>
            热门核验主链：{flow.title}
          </Link>
        ))}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Path</th>
            <th>核验入口</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(ref => {
            const cleanPath = ref.path.replace(/^\.\.\//, '')
            return (
              <tr key={ref.path}>
                <td>{ref.label}</td>
                <td>{ref.path}</td>
                <td>
                  <Link href={cleanPath.startsWith('analysis/') ? createAnalysisHref(cleanPath) : createSourceHref(cleanPath, undefined)}>
                    {cleanPath.startsWith('analysis/') ? '打开原文' : '打开源码'}
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
