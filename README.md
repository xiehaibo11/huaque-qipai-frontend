# 南北娱乐官方网站

Vue 3、TypeScript、Vite 与 Vue Router 实现的公开官网。当前路由包括首页、下载说明、隐私政策、
服务协议、家长监护和 `/payment/result` 支付返回页。

支付返回页只根据合法 `orderId` 与 `success|cancel` 生成固定
`https://www.nanbeiyule.com/payment/result` App Link；它不接收密钥、不调用履约接口，也不把
浏览器回跳描述为支付到账。`public/.well-known/assetlinks.json` 只关联 Release 证书签名的
`com.nanbeiyule.game`。

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## 仓库导航（南北娱乐全平台）

| 端 | 仓库地址 |
| --- | --- |
| 后端（Spring Boot / Java 21 / PostgreSQL） | https://github.com/xiehaibo11/huaque-qipai-backend |
| 前端官网（Vue 3 / TypeScript / Vite） | https://github.com/xiehaibo11/huaque-qipai-frontend |
| 安卓客户端（Android，架构对齐浙江游戏大厅） | https://github.com/xiehaibo11/huaque-qipai-android |
| UI 设计源（PSD 源文件 / 生图方案，Git LFS） | https://github.com/xiehaibo11/huaque-qipai-ui |
| 浙江游戏大厅逆向资料（原版设计证据） | https://github.com/xiehaibo11/zhejiang-game-hall |

克隆任意一端后，按上表地址补齐其余仓库即可组成完整工作区；各仓库均为私有仓库，需要账号 xiehaibo11 授权访问。
