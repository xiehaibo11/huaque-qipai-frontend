import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Android verified app links', () => {
  it('associates the payment return only with the signed production package', () => {
    const statements = JSON.parse(
      readFileSync(resolve('public/.well-known/assetlinks.json'), 'utf8'),
    )

    expect(statements).toHaveLength(1)
    expect(statements[0].relation).toContain('delegate_permission/common.handle_all_urls')
    expect(statements[0].target.package_name).toBe('com.nanbeiyule.game')
    expect(statements[0].target.package_name).not.toContain('.debug')
    expect(statements[0].target.sha256_cert_fingerprints).toEqual([
      '2D:99:2E:0B:13:21:BA:EA:3A:55:D5:9A:6D:06:DB:57:F2:F1:9A:43:73:AF:C9:80:04:6D:22:63:22:D3:CE:1F',
    ])
  })
})
