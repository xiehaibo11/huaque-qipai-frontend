<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { parsePaymentReturn } from '../payment/paymentReturn'

const route = useRoute()
const paymentReturn = computed(() =>
  parsePaymentReturn({
    orderId: route.query.orderId,
    outcome: route.query.outcome,
  }),
)

const isCancel = computed(() => paymentReturn.value.outcome === 'cancel')

onMounted(() => {
  const appLink = paymentReturn.value.appLink
  if (!appLink || !/Android/i.test(navigator.userAgent)) return

  const attemptKey = `nanbei-payment-return:${paymentReturn.value.orderId}:${paymentReturn.value.outcome}`
  if (sessionStorage.getItem(attemptKey)) return
  sessionStorage.setItem(attemptKey, 'attempted')

  window.setTimeout(() => {
    window.location.assign(appLink)
  }, 180)
})
</script>

<template>
  <section class="payment-result-page" aria-live="polite">
    <div class="payment-result-card">
      <div class="payment-result-mark" aria-hidden="true">
        {{ paymentReturn.valid ? (isCancel ? '—' : '…') : '!' }}
      </div>

      <template v-if="paymentReturn.valid">
        <p class="eyebrow">PAYMENT RETURN</p>
        <h1>{{ isCancel ? '支付未完成' : '正在确认支付结果' }}</h1>
        <p v-if="isCancel" class="payment-result-lead">
          本次付款可能已取消或尚未完成。返回应用后将查询服务器订单状态，以服务器结果为准。
        </p>
        <p v-else class="payment-result-lead">
          正在返回南北娱乐并向服务器查询订单。会员状态仅在支付渠道通知验证完成后更新。
        </p>
        <a
          class="button button-primary payment-result-action"
          data-testid="return-to-app"
          :href="paymentReturn.appLink ?? undefined"
        >
          返回南北娱乐
        </a>
        <p class="payment-result-note">
          如未自动打开应用，请点击上方按钮；请勿关闭应用内的订单确认提示。
        </p>
      </template>

      <template v-else>
        <p class="eyebrow">INVALID PAYMENT RETURN</p>
        <h1>无法识别支付订单</h1>
        <p class="payment-result-lead">
          返回参数缺失或无效。请直接打开南北娱乐，在会员中心查看订单状态。
        </p>
      </template>
    </div>
  </section>
</template>
