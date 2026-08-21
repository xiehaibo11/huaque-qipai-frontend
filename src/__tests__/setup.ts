import { vi } from 'vitest'

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: vi.fn<typeof window.scrollTo>(),
  writable: true,
})
