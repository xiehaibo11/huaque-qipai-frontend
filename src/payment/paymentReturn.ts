export type PaymentReturnOutcome = 'success' | 'cancel'

export interface PaymentReturnQuery {
  orderId?: unknown
  outcome?: unknown
}

export interface PaymentReturnState {
  valid: boolean
  orderId: string | null
  outcome: PaymentReturnOutcome | null
  appLink: string | null
}

const appLinkBase = 'https://www.nanbeiyule.com/payment/result'
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function parsePaymentReturn(query: PaymentReturnQuery): PaymentReturnState {
  const orderId = singleString(query.orderId)
  const rawOutcome = singleString(query.outcome)
  const outcome = rawOutcome === 'success' || rawOutcome === 'cancel' ? rawOutcome : null

  if (!orderId || !uuidPattern.test(orderId) || !outcome) {
    return { valid: false, orderId: null, outcome: null, appLink: null }
  }

  const normalizedOrderId = orderId.toLowerCase()
  const appLink = new URL(appLinkBase)
  appLink.searchParams.set('orderId', normalizedOrderId)
  appLink.searchParams.set('outcome', outcome)
  return {
    valid: true,
    orderId: normalizedOrderId,
    outcome,
    appLink: appLink.toString(),
  }
}

function singleString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}
