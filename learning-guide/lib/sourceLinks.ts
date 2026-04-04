import type { SourceJump } from '@/content/types'

export function createSourceHref(path: string, symbol?: string) {
  const params = new URLSearchParams({ path })
  if (symbol) {
    params.set('symbol', symbol)
  }
  return `/source?${params.toString()}`
}

export function createSourceJump(path: string, displayLabel: string, symbol?: string, note?: string): SourceJump {
  return {
    path,
    displayLabel,
    symbol,
    note,
  }
}
