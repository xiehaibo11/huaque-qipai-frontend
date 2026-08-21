import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../App.vue'
import router from '../router'

const orderId = '5bf99fd6-a1af-482d-9e25-2f13dd3dc54d'

describe('payment result return page', () => {
  afterEach(async () => {
    await router.push('/')
  })

  it('describes a success return as awaiting server confirmation', async () => {
    const wrapper = await render(`/payment/result?orderId=${orderId}&outcome=success`)

    expect(wrapper.text()).toContain('正在确认支付结果')
    expect(wrapper.text()).not.toContain('支付成功')
    expect(wrapper.text()).not.toContain('会员已开通')
    expect(wrapper.get('[data-testid="return-to-app"]').attributes('href')).toBe(
      `https://www.nanbeiyule.com/payment/result?orderId=${orderId}&outcome=success`,
    )
  })

  it('describes cancel as unfinished without claiming a terminal server state', async () => {
    const wrapper = await render(`/payment/result?orderId=${orderId}&outcome=cancel`)

    expect(wrapper.text()).toContain('支付未完成')
    expect(wrapper.text()).toContain('返回应用后将查询服务器订单状态')
    expect(wrapper.text()).not.toContain('支付成功')
    expect(wrapper.text()).not.toContain('会员已开通')
  })

  it('does not create an app link for a missing or invalid order id', async () => {
    const missing = await render('/payment/result?outcome=success')
    expect(missing.find('[data-testid="return-to-app"]').exists()).toBe(false)

    const invalid = await render('/payment/result?orderId=not-a-uuid&outcome=cancel')
    expect(invalid.find('[data-testid="return-to-app"]').exists()).toBe(false)
    expect(invalid.text()).toContain('无法识别支付订单')
  })

  it('never accepts an externally supplied return target', async () => {
    const wrapper = await render(
      `/payment/result?orderId=${orderId}&outcome=cancel&returnUrl=https://evil.example/steal`,
    )

    const href = wrapper.get('[data-testid="return-to-app"]').attributes('href')
    expect(href).toBe(
      `https://www.nanbeiyule.com/payment/result?orderId=${orderId}&outcome=cancel`,
    )
    expect(href).not.toContain('evil.example')
  })
})

async function render(path: string) {
  await router.push(path)
  await router.isReady()
  return mount(App, {
    global: {
      plugins: [router],
    },
  })
}
