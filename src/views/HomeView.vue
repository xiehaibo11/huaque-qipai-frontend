<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">NANBEI ENTERTAINMENT</p>
        <h1>南北相聚，乐在一局</h1>
        <p class="hero-lead">
          南北娱乐是一款面向成年用户的休闲游戏应用，提供地区玩法选择、账号登录及游戏大厅服务。
        </p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/download">查看 Android 版本</RouterLink>
          <RouterLink class="button button-secondary" to="/privacy">了解隐私保护</RouterLink>
        </div>
        <dl class="hero-facts">
          <div>
            <dt>应用名称</dt>
            <dd>南北娱乐</dd>
          </div>
          <div>
            <dt>英文名称</dt>
            <dd>Nanbei Entertainment</dd>
          </div>
          <div>
            <dt>适用平台</dt>
            <dd>Android</dd>
          </div>
        </dl>
      </div>

      <div class="hero-card" aria-label="南北娱乐官方网站卡片">
        <div class="hero-card-mark">南北</div>
        <p>地区玩法 · 游戏大厅</p>
        <span>官方移动应用</span>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <p class="eyebrow">APP EXPERIENCE</p>
        <h2>清晰、可靠的游戏入口</h2>
        <p>从账号登录到地区选择，以简洁流程连接熟悉的休闲玩法。</p>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <span class="feature-index">01</span>
          <h3>安全登录</h3>
          <p>支持手机验证码登录，并采用微信官方 Open SDK 接入微信授权登录。</p>
        </article>
        <article class="feature-card">
          <span class="feature-index">02</span>
          <h3>地区选择</h3>
          <p>根据已开放服务展示地区入口，保留明确的选择和重新选择流程。</p>
        </article>
        <article class="feature-card">
          <span class="feature-index">03</span>
          <h3>游戏大厅</h3>
          <p>统一展示账号信息、可用玩法和服务入口，持续优化移动端体验。</p>
        </article>
      </div>
    </section>

    <section class="trust-section">
      <div>
        <p class="eyebrow">USER PROTECTION</p>
        <h2>把用户知情权放在登录之前</h2>
      </div>
      <div class="trust-list">
        <p><strong>明确授权</strong><span>登录前可查看用户协议与隐私政策，并主动确认。</span></p>
        <p>
          <strong>最小使用</strong><span>仅在提供账号、风控和故障排查所需范围内处理信息。</span>
        </p>
        <p><strong>健康提示</strong><span>应用面向成年用户，倡导合理安排时间与健康娱乐。</span></p>
      </div>
    </section>
  </div>
</template>
