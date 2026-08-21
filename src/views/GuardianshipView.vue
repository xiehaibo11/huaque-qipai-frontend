<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <article class="legal-page">
    <header class="legal-header">
      <p class="eyebrow">PARENTAL GUARDIANSHIP</p>
      <h1>南北娱乐家长监护工程</h1>
      <p>更新日期：2026 年 7 月 28 日　生效日期：2026 年 7 月 28 日</p>
    </header>

    <div class="legal-body">
      <nav class="legal-links" aria-label="相关协议">
        <RouterLink to="/terms">服务协议</RouterLink>
        <span aria-current="page">家长监护工程</span>
        <RouterLink to="/privacy">隐私政策</RouterLink>
      </nav>

      <p class="legal-callout">
        <strong>适用说明：</strong>
        南北娱乐当前面向年满 18 周岁的成年用户，未成年人不应自行注册或使用本服务。本页面用于向监护人说明发现疑似未成年人使用服务时的联系和处理方式。
      </p>

      <section>
        <h2>一、监护倡议</h2>
        <p>
          监护人应关注未成年人的网络使用行为，帮助其建立合理的上网时间、消费观念和个人信息保护意识，并妥善保管本人手机、验证码、支付账户及已登录设备。
        </p>
      </section>

      <section>
        <h2>二、发现疑似未成年人使用时</h2>
        <ul>
          <li>先与未成年人沟通，了解其使用的登录方式、设备和大致时间；</li>
          <li>及时修改由您控制的手机号、微信或设备账号的安全设置，并检查异常授权；</li>
          <li>通过南北娱乐应用右上角“客服”入口说明情况，提交可用于定位账号的必要线索；</li>
          <li>如涉及第三方支付，请同时查看相应支付平台的账单和未成年人保护渠道。</li>
        </ul>
      </section>

      <section>
        <h2>三、提交与核验</h2>
        <p>
          为避免错误处置他人账号并保护个人信息，我们可能要求申请人说明与未成年人的监护关系，并提供核验账号归属和使用情况所必需的信息。请勿提交与处理事项无关的敏感资料。
        </p>
        <p>
          我们会根据现有记录和实际情况进行核查，并在法律法规和产品能力允许的范围内采取适当措施。处理时间可能因信息完整度、账号归属争议或第三方核验而有所不同。
        </p>
      </section>

      <section>
        <h2>四、处理原则</h2>
        <ul>
          <li>最小必要：仅收集核验和处理所需的信息；</li>
          <li>审慎核验：兼顾监护需求、账号安全和其他用户合法权益；</li>
          <li>如实反馈：不承诺当前产品尚未提供的远程监控、实时查询或家长控制后台；</li>
          <li>依法处理：涉及账号、个人信息和支付争议时，按照适用法律及实际服务规则处理。</li>
        </ul>
      </section>

      <section>
        <h2>五、个人信息保护</h2>
        <p>
          监护申请中涉及的个人信息，将依照
          <RouterLink to="/privacy">《隐私政策》</RouterLink>
          和适用法律处理。完成核验和处置后，我们仅在实现处理目的或履行法定义务所需的期限内保存必要记录。
        </p>
      </section>

      <section>
        <h2>六、相关规则与联系渠道</h2>
        <p>
          服务使用与账号规则请参阅
          <RouterLink to="/terms">《服务协议》</RouterLink>
          。如需提交监护相关情况，请使用南北娱乐应用右上角“客服”入口；该入口是当前公开的正式联系渠道。
        </p>
      </section>
    </div>
  </article>
</template>
