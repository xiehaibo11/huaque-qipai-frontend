import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import DownloadView from '../views/DownloadView.vue'
import GuardianshipView from '../views/GuardianshipView.vue'
import HomeView from '../views/HomeView.vue'
import PaymentResultView from '../views/PaymentResultView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '南北娱乐｜Nanbei Entertainment' },
  },
  {
    path: '/download',
    name: 'download',
    component: DownloadView,
    meta: { title: '下载｜南北娱乐' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: { title: '隐私政策｜南北娱乐' },
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: { title: '服务协议｜南北娱乐' },
  },
  {
    path: '/guardianship',
    name: 'guardianship',
    component: GuardianshipView,
    meta: { title: '家长监护工程｜南北娱乐' },
  },
  {
    path: '/payment/result',
    name: 'payment-result',
    component: PaymentResultView,
    meta: { title: '支付结果确认｜南北娱乐' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title = String(to.meta.title ?? '南北娱乐')
})

export default router
