# AGENTS.md

本仓库是独立的 DSH 分享图片插件。它继承父目录协作规则，并补充以下约定。

- 使用中文沟通，面向用户的 README 同步维护中英文版本。
- 仓库只记录当前有效的产品事实、兼容范围、用户使用方式和开发要求；调研、迁移、排障、临时环境与旧版本验证等过程性记录留在仓库外部，不进入 README、源码注释、changelog 或提交说明。
- 对外文档只正面描述当前要求，不以新旧对比方式暗示历史权限、历史分发方式或非公开阶段。
- `lib/` 是 DSH 直接加载的交付物，修改 `src/` 后必须重新构建并同步提交。
- 未经用户明确授权，不推送、不发布 npm 包。
- 改动后至少运行 `pnpm typecheck`、`pnpm test`、`pnpm build`、`npm pack --dry-run` 和 `git diff --check`。

## 发版规则

- 用户说“发版”时，直接在干净且与远端同步的 `main` 上按 SemVer 更新 `package.json` 和 `CHANGELOG.md`，然后停止并请用户审阅。
- 用户说“继续”后，重新读取并保留其审阅修改，完成构建与检查，提交 `chore(release): vX.Y.Z`，运行 `pnpm release:check`，推送 `main` 并等待 CI。
- CI 通过后创建并推送 annotated tag `vX.Y.Z`；workflow 只负责校验、发布同一 tarball 到 npm 并创建 GitHub Release，完成后核对版本和产物一致。
