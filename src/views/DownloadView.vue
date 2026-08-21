<template>
  <div class="download-page">
    <section class="download-hero">
      <div>
        <p class="eyebrow">ANDROID APPLICATION</p>
        <h1>南北娱乐 Android 版</h1>
        <p>
          正式版本正在完成微信开放平台审核与发布前验证。审核完成后，本页将提供经过签名校验的官方安装包。
        </p>
      </div>

      <div class="release-card">
        <span class="release-status">审核准备中</span>
        <dl>
          <div>
            <dt>应用名称</dt>
            <dd>南北娱乐</dd>
          </div>
          <div>
            <dt>英文名称</dt>
            <dd>Nanbei Entertainment</dd>
          </div>
          <div>
            <dt>Android 包名</dt>
            <dd><code>com.nanbeiyule.game</code></dd>
          </div>
          <div>
            <dt>当前版本</dt>
            <dd>0.1-reference</dd>
          </div>
        </dl>
        <button class="button button-disabled" type="button" disabled>
          正式版本审核完成后开放下载
        </button>
      </div>
    </section>

    <section class="section compact-section">
      <div class="section-heading">
        <p class="eyebrow">INSTALLATION SAFETY</p>
        <h2>仅从官方网站获取安装包</h2>
      </div>
      <div class="safety-grid">
        <p><strong>固定包名</strong><span>正式应用包名为 com.nanbeiyule.game。</span></p>
        <p><strong>生产签名</strong><span>发布包使用固定 Release 证书签名并提供校验摘要。</span></p>
        <p>
          <strong>安全连接</strong><span>正式版本仅连接 api.nanbeiyule.com 的 HTTPS 服务。</span>
        </p>
      </div>
    </section>
  </div>
</template>
