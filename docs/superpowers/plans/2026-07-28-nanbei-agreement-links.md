# Nanbei Agreement Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a normative Nanbei terms page and guardianship page, then make the three Android login agreement labels open those first-party HTTPS pages in the system browser.

**Architecture:** Vue owns the public legal documents and route-level rendering. Android uses a small immutable enum for the three allowed destinations, lets `LoginView` report the selected destination, and keeps `Intent.ACTION_VIEW` navigation in `MainActivity`. The deployment replaces only the committed frontend source after a server-side backup and rebuilds only the frontend Compose service.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Vitest, Android Java 17, Android Gradle Plugin 8.11.1, JUnit 4, Docker Compose, Caddy.

---

### Task 1: Add failing frontend agreement route tests

**Files:**
- Modify: `frontend/src/__tests__/routes.spec.ts`

- [ ] **Step 1: Add a route case and focused legal-document tests**

Add `/guardianship` to the table test and assert:

```ts
expect(wrapper.text()).toContain('家长监护工程')
expect(wrapper.text()).toContain('年满 18 周岁')
```

On `/terms`, assert the headings/text `重要提示`, `账号注册、登录与安全`,
`虚拟内容与付费`, `责任边界与不可抗力`, and verify links with exact
`href="/privacy"` and `href="/guardianship"`.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
cd frontend
npm run test:unit -- --run src/__tests__/routes.spec.ts
```

Expected: FAIL because `/guardianship` and the expanded terms content do not exist.

### Task 2: Implement the public legal pages

**Files:**
- Modify: `frontend/src/router/index.ts`
- Modify: `frontend/src/App.vue`
- Modify: `frontend/src/views/TermsView.vue`
- Create: `frontend/src/views/GuardianshipView.vue`
- Modify: `frontend/src/assets/main.css`

- [ ] **Step 1: Register the guardianship route**

Import `GuardianshipView` and add:

```ts
{
  path: '/guardianship',
  name: 'guardianship',
  component: GuardianshipView,
  meta: { title: '家长监护工程｜南北娱乐' },
}
```

- [ ] **Step 2: Create the guardianship page**

Use the existing `.legal-page`, `.legal-header`, and `.legal-body` structure. State that
the current service is for users aged 18 or older; provide practical guardian guidance;
link to `/terms` and `/privacy`; do not invent a legal entity, hotline, address, real-name
portal, or monitoring system.

- [ ] **Step 3: Expand the terms page**

Implement every content section from
`frontend/docs/superpowers/specs/2026-07-28-nanbei-agreement-links-design.md`.
Keep the brand as `南北娱乐`, add a visible important notice, and use `RouterLink` for
first-party legal documents.

- [ ] **Step 4: Add related-document navigation and responsive styles**

Add footer `RouterLink` for `/guardianship` and CSS for:

```css
.legal-notice
.legal-toc
.legal-related-links
.legal-section
```

Keep tap targets at least 44 CSS pixels high and collapse multi-column navigation below
620px.

- [ ] **Step 5: Run frontend tests and verify GREEN**

Run:

```bash
cd frontend
npm run test:unit -- --run src/__tests__/routes.spec.ts
npm run type-check
npm run build
```

Expected: all commands exit 0.

### Task 3: Add failing Android destination tests

**Files:**
- Create: `android/project/host-shell/src/test/java/com/nanbeiyule/game/LoginAgreementLinkTest.java`
- Create: `android/project/host-shell/src/test/java/com/nanbeiyule/game/LoginAgreementBrowserContractTest.java`

- [ ] **Step 1: Test the exact destination model**

Write assertions for:

```java
LoginAgreementLink.SERVICE.url()
// https://www.nanbeiyule.com/terms
LoginAgreementLink.GUARDIANSHIP.url()
// https://www.nanbeiyule.com/guardianship
LoginAgreementLink.PRIVACY.url()
// https://www.nanbeiyule.com/privacy
```

Parse every URI and assert scheme `https` and host `www.nanbeiyule.com`.

- [ ] **Step 2: Add source-level wiring contract**

Read `LoginView.java` and `MainActivity.java` from the repository root and assert the source
contains:

```java
onAgreementLinkRequested(LoginAgreementLink.SERVICE)
onAgreementLinkRequested(LoginAgreementLink.GUARDIANSHIP)
onAgreementLinkRequested(LoginAgreementLink.PRIVACY)
new Intent(Intent.ACTION_VIEW, Uri.parse(link.url()))
```

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```bash
cd android
./gradlew :project:host-shell:testDebugUnitTest \
  --tests com.nanbeiyule.game.LoginAgreementLinkTest \
  --tests com.nanbeiyule.game.LoginAgreementBrowserContractTest
```

Expected: compilation/test failure because the enum and wiring do not exist.

### Task 4: Implement Android browser navigation

**Files:**
- Create: `android/project/host-shell/src/main/java/com/nanbeiyule/game/LoginAgreementLink.java`
- Modify: `android/project/host-shell/src/main/java/com/nanbeiyule/game/LoginView.java`
- Modify: `android/project/host-shell/src/main/java/com/nanbeiyule/game/MainActivity.java`
- Modify: `android/project/host-shell/src/main/res/values/strings.xml`

- [ ] **Step 1: Add the immutable destination enum**

Define:

```java
enum LoginAgreementLink {
    SERVICE("服务协议", "https://www.nanbeiyule.com/terms"),
    GUARDIANSHIP("家长监护工程", "https://www.nanbeiyule.com/guardianship"),
    PRIVACY("隐私政策", "https://www.nanbeiyule.com/privacy");
}
```

Expose package-private `title()` and `url()` accessors only.

- [ ] **Step 2: Add one LoginView listener**

Define `OnAgreementLinkRequestedListener`, add its setter, and replace the three placeholder
branches with the corresponding enum callbacks. If no listener is attached, retain a stable
placeholder message instead of crashing.

- [ ] **Step 3: Open the URL from MainActivity**

Attach the listener in `showLoginPage()` and add:

```java
private void openAgreementLink(LoginAgreementLink link) {
    try {
        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(link.url())));
    } catch (RuntimeException exception) {
        Toast.makeText(this, R.string.login_agreement_open_failed, Toast.LENGTH_LONG).show();
    }
}
```

Do not mutate the agreement checkbox and do not log the URL or exception.

- [ ] **Step 4: Run Android focused tests and verify GREEN**

Run the Task 3 Gradle command again.

Expected: both test classes pass.

### Task 5: Run full local verification

**Files:**
- No source changes.

- [ ] **Step 1: Verify frontend**

```bash
(cd frontend && npm run test:unit -- --run && npm run type-check && npm run build)
```

- [ ] **Step 2: Verify Android**

```bash
(cd android && ./gradlew \
  :project:host-shell:testDebugUnitTest \
  :project:host-shell:lintDebug \
  :project:host-shell:assembleDebug)
```

- [ ] **Step 3: Verify monorepo and production configuration**

```bash
python3 -m unittest tests/test_monorepo_layout.py tests/test_production_deployment.py
docker compose --env-file .env.production.example \
  -f compose.production.yml config --quiet
```

Expected: all commands exit 0.

- [ ] **Step 4: Verify local pages in a browser**

Start Vite on a loopback-only port, inspect desktop and mobile layouts, click the related
document links, and confirm `/terms`, `/guardianship`, and `/privacy` render with no console
errors.

### Task 6: Audit and commit only allowed source

**Files:**
- Stage only approved frontend/backend/Android application and build files.

- [ ] **Step 1: Produce an explicit staging manifest**

Exclude:

```text
artifacts/
android/reference/
android/artifacts/
android/.gradle/
android/build/
android/**/build/
android/local.properties
android/keystore/
android/keystore.properties
android/project/host-shell/libs/*.aar
frontend/node_modules/
frontend/dist/
backend/.env
backend/target/
```

- [ ] **Step 2: Inspect the staged diff**

Run:

```bash
git diff --cached --name-status
git diff --cached --check
git diff --cached --numstat
```

Also reject any staged filename matching `.env`, `keystore`, `.jks`, `.aar`, `reference`,
`artifacts`, `AccessKey`, `AppSecret`, or build/cache directories.

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: publish agreements and open login links"
```

Expected: commit succeeds and the resulting commit contains no reverse-engineering evidence
or credentials.

### Task 7: Deploy the committed frontend

**Files:**
- Remote active source: `/opt/nanbei/frontend`
- Remote rollback archive: `/opt/nanbei/rollback/`

- [ ] **Step 1: Read-only SSH preflight**

```bash
ssh nanbeiyule '
  set -eu
  hostname
  docker compose version
  test -d /opt/nanbei/frontend
  test -f /opt/nanbei/.env
  stat -c "%a %n" /opt/nanbei/.env
  cd /opt/nanbei
  docker compose --env-file .env -f compose.production.yml ps frontend
'
```

Expected: passwordless SSH works, `.env` mode is `600`, and the current frontend is running.
Do not print `.env`.

- [ ] **Step 2: Archive exact committed frontend source**

```bash
commit_sha="$(git rev-parse HEAD)"
git archive --format=tar.gz \
  --prefix="frontend-${commit_sha}/" \
  -o "/tmp/frontend-${commit_sha}.tar.gz" \
  "${commit_sha}:frontend"
shasum -a 256 "/tmp/frontend-${commit_sha}.tar.gz"
```

- [ ] **Step 3: Back up and activate source without touching secrets or volumes**

Upload the archive, verify its SHA-256 remotely, extract to a new release directory, archive
the current frontend under `/opt/nanbei/rollback`, then copy the verified release to
`/opt/nanbei/frontend`. Preserve `/opt/nanbei/.env`, Compose files, Caddy state, PostgreSQL
volumes, and older rollback archives.

- [ ] **Step 4: Rebuild only the frontend service**

```bash
ssh nanbeiyule '
  set -eu
  cd /opt/nanbei
  docker compose --env-file .env -f compose.production.yml config --quiet
  docker compose --env-file .env -f compose.production.yml \
    up -d --no-deps --build --wait frontend
  docker compose --env-file .env -f compose.production.yml ps frontend caddy
'
```

- [ ] **Step 5: Verify production**

Require valid TLS and HTTP 200 for:

```text
https://www.nanbeiyule.com/terms
https://www.nanbeiyule.com/guardianship
https://www.nanbeiyule.com/privacy
```

Use a fresh browser inspection to confirm page titles, core content, responsive layout, and
cross-links. Confirm the backend health endpoint remains `UP`.
