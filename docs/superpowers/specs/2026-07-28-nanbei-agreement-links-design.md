# 南北娱乐三协议与浏览器跳转设计

更新日期：2026-07-28

## 目标

在不复制参考站过时或缺失主体的法律文本、不调用原版服务器的前提下：

1. 将官网 `/terms` 扩展为结构清晰、表述平衡的南北娱乐服务协议；
2. 新增官网 `/guardianship` 家长监护工程页面；
3. 保留现有 `/privacy` 隐私政策；
4. 让 Android 登录页底部三个原版资源按钮分别通过系统浏览器打开南北娱乐自己的
   HTTPS 页面。

全程使用品牌名称“南北娱乐”，不虚构公司主体、地址、电话、备案号或争议管辖地。

## 原版确认事实

只读证据位于 `android/reference/`：

- `host-lua/base-bytecode/login/Modules/Login/View.lua` 和热更新同名文件把三项定义为
  `SERVER`、`PARENT_ALGUIDANCE`、`PRIVACY`。
- 登录页三个点击回调最终调用
  `cc.Application:getInstance():openURL(agreement.url)`，即交给系统浏览器处理，
  不是在游戏内嵌 WebView。
- `host-lua/base-bytecode/lobby/Config/Qualification/Qualification_900020.lua`
  记录三类独立网址：服务协议、家长监护、隐私协议。
- 当前重建 `LoginView` 已恢复三个独立触摸区域和原版文字图片，但点击仅显示占位提示。

以上只用于说明行为和按钮映射；不复制原版域名、运营主体、服务端协议或参考代码到
可编译工程。

## 公开 URL

| 登录页按钮 | 南北娱乐 URL |
|---|---|
| 服务协议 | `https://www.nanbeiyule.com/terms` |
| 家长监护工程 | `https://www.nanbeiyule.com/guardianship` |
| 隐私政策 | `https://www.nanbeiyule.com/privacy` |

URL 必须集中定义在可测试的 Android 类型中，全部使用 HTTPS、固定
`www.nanbeiyule.com` 主机，不接受运行时外部输入。

## 前端信息架构

### 服务协议

`TermsView.vue` 使用当前官网的暖金、深绿视觉，不照搬参考站的旧式页面。正文包括：

1. 导言与重要提示；
2. 定义、适用范围与协议接受；
3. 服务内容与开放范围；
4. 账号注册、登录与安全；
5. 地区选择、游戏规则和用户行为；
6. 虚拟内容、付费与退款原则；
7. 个人信息保护与隐私政策链接；
8. 成年用户、健康游戏与家长监护；
9. 知识产权；
10. 服务维护、变更、中断和终止；
11. 违约处理；
12. 责任边界与不可抗力；
13. 协议更新与通知；
14. 法律适用、争议解决与联系我们。

免责和限制条款使用醒目提示，但不得写成排除用户主要法定权利的绝对免责。

### 家长监护工程

`GuardianshipView.vue` 明确南北娱乐当前面向年满 18 周岁的成年用户，不声称已有未实现的
实名认证、监控后台、专线电话或材料受理系统。页面提供：

- 监护目标与适用说明；
- 家庭沟通、设备管理、账号和支付安全建议；
- 发现未成年人使用时的处理步骤；
- 通过应用内客服反馈账号问题的路径；
- 服务协议和隐私政策关联链接。

### 导航

- 注册 `/guardianship` 路由和独立页面标题。
- 页脚增加“家长监护”入口。
- 法律页面顶部增加相关文件导航，保证三页可相互访问。
- 主导航保持四项不变，避免移动端拥挤。

## Android 架构

新增 `LoginAgreementLink` 枚举，封装中文标题和固定 URL。`LoginView` 只负责把三个命中区域
映射为枚举并通知监听器；`MainActivity` 负责：

1. 校验链接来自枚举；
2. 创建 `Intent.ACTION_VIEW` 和 `Uri.parse(url)`；
3. 交给系统浏览器；
4. 无可用浏览器或启动失败时显示稳定中文提示；
5. 不改变勾选框状态，也不自动视为用户同意。

该边界保持 View 不拥有外部导航生命周期，同时贴合原版 `openURL` 行为。

## 测试

### 前端

- `/terms` 包含规范章节、重要提示和 `/privacy`、`/guardianship` 链接；
- `/guardianship` 可路由、标题正确，并说明“年满 18 周岁”；
- 原有首页、下载、隐私与一键登录披露测试继续通过；
- `npm run test:unit -- --run`、`npm run type-check`、`npm run build` 全部通过。

### Android

- 枚举恰好包含三个 HTTPS URL；
- URL 主机均为 `www.nanbeiyule.com`；
- 三个触摸区域映射到正确枚举；
- `MainActivity` 使用 `Intent.ACTION_VIEW`；
- 运行 host-shell 单元测试、Lint 和 Debug 构建。

### 生产

- 先提交经过审计的允许范围代码；
- 部署前备份服务器现有 `/opt/nanbei/frontend`，不读取或输出 `.env`；
- 只重建 `frontend` 服务，不重建 PostgreSQL 卷；
- 用浏览器和 `curl` 验证 `/terms`、`/guardianship`、`/privacy` 均为 HTTPS 200，
  页面标题和核心文本正确。

## 提交边界

- 允许：`frontend/`、`backend/`、Android Gradle/宿主应用源码与运行资源。
- 排除：`artifacts/`、`android/reference/`、逆向工具输出、原始归档、`.env`、
  keystore、AccessKey、AppSecret、本机配置、构建产物、缓存和官方闭源 AAR。
- 提交前必须查看 `git diff --cached --name-status` 和敏感名称审计结果。
