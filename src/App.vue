<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="南北娱乐官方网站首页">
        <span class="brand-mark" aria-hidden="true">南北</span>
        <span>
          <strong>南北娱乐</strong>
          <small>Nanbei Entertainment</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="主要导航">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/download">下载</RouterLink>
        <RouterLink to="/privacy">隐私政策</RouterLink>
        <RouterLink to="/terms">服务协议</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <div>
        <strong>南北娱乐</strong>
        <p>面向成年用户的休闲游戏应用</p>
      </div>
      <div class="footer-links">
        <RouterLink to="/privacy">隐私政策</RouterLink>
        <RouterLink to="/terms">服务协议</RouterLink>
        <RouterLink to="/guardianship">家长监护工程</RouterLink>
        <span>nanbeiyule.com</span>
      </div>
      <p class="health-notice">
        健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
      </p>
      <p class="copyright">© 2026 Nanbei Entertainment. All rights reserved.</p>
    </footer>
  </div>
</template>
