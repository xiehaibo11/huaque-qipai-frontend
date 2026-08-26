import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../App.vue'
import router from '../router'

describe('public review routes', () => {
  afterEach(async () => {
    await router.push('/')
  })

  it.each([
    ['/', '南北娱乐'],
    ['/privacy', '隐私政策'],
    ['/terms', '服务协议'],
    ['/guardianship', '家长监护工程'],
    ['/download', 'com.nanbeiyule.game'],
  ])('renders %s with its required review text', async (path, expected) => {
    await router.push(path)
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain(expected)
  })

  it('discloses one-tap carrier authentication data processing', async () => {
    await router.push('/privacy')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('号码认证')
    expect(wrapper.text()).toContain('SIM 卡状态')
    expect(wrapper.text()).toContain('IP 地址')
  })

  it('discloses real-name verification data processing', async () => {
    await router.push('/privacy')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('实名认证信息')
    expect(wrapper.text()).toContain('真实姓名和身份证号码')
    expect(wrapper.text()).toContain('阿里云身份核验服务')
    expect(wrapper.text()).toContain('支付宝一键实名')
    expect(wrapper.text()).toContain('HMAC-SHA-256 加密指纹')
    expect(wrapper.text()).toContain('未满 18')
  })

  it('discloses friend (牌友) data processing', async () => {
    await router.push('/privacy')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('牌友（好友）信息')
    expect(wrapper.text()).toContain('牌友关系、好友申请记录、邀请与预约通知')
    expect(wrapper.text()).toContain('最后活跃时间')
    expect(wrapper.text()).toContain('数字 ID 或完整手机号精确搜索')
    expect(wrapper.text()).toContain('不会向搜索方展示他人的手机号')
    expect(wrapper.text()).toContain('昵称、头像和在线状态')
  })

  it('publishes a complete service agreement with first-party legal links', async () => {
    await router.push('/terms')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('重要提示')
    expect(wrapper.text()).toContain('账号注册、登录与安全')
    expect(wrapper.text()).toContain('虚拟内容与付费')
    expect(wrapper.text()).toContain('责任边界与不可抗力')
    expect(wrapper.find('.legal-body a[href="/guardianship"]').exists()).toBe(true)
    expect(wrapper.find('.legal-body a[href="/privacy"]').exists()).toBe(true)
  })

  it.each(['/terms', '/privacy'])(
    'uses only the Nanbei operator identity on %s',
    async (path) => {
      await router.push(path)
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.text()).toContain('南北娱乐')
      expect(wrapper.text()).not.toContain('杭州边锋')
    },
  )

  it('explains the adult-only guardianship position without overstating controls', async () => {
    await router.push('/guardianship')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('家长监护工程')
    expect(wrapper.text()).toContain('年满 18 周岁')
    expect(wrapper.find('.legal-body a[href="/terms"]').exists()).toBe(true)
    expect(wrapper.find('.legal-body a[href="/privacy"]').exists()).toBe(true)
  })
})
