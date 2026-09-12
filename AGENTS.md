# AGENTS.md

本仓库是独立的 DSH 分享图片插件。它继承父目录协作规则，并补充以下约定。

- 使用中文沟通，面向用户的 README 同步维护中英文版本。
- 仓库只记录当前有效的产品事实、兼容范围、用户使用方式和开发要求；调研、迁移、排障、临时环境与旧版本验证等过程性记录留在仓库外部，不进入 README、源码注释、changelog 或提交说明。
- 对外文档描述当前事实，避免夹带内部历史与过程记录。
- `lib/` 是 DSH 直接加载的交付物，修改 `src/` 后必须重新构建并同步提交。
- 未经用户明确授权，不推送、不发布 npm 包。
- 源码、依赖或打包改动运行 `pnpm typecheck`、`pnpm test`、`pnpm build`、`npm pack --dry-run`；纯文档改动检查链接与 diff。提交前运行 `git diff --check`。

## DSH 版本兼容与升级

- 用户提到 DSH 版本兼容、升级适配或升级后回归时，必须使用 [dsh-plugin-upgrade-skill](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill) 中的 [plugin-upgrade](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill/blob/main/skills/plugin-upgrade/SKILL.md)。开始前完整读取该入口，再按目标版本读取相关参考卡；本地未安装时从仓库读取，不凭记忆套用旧规则。
- 按用户意图区分只读检查、已安装插件更新和插件源码迁移；检查请求只输出兼容结论与方案，明确要求适配后按已授权范围执行。该规则不自动授权升级 DSH 主程序、推送或发布。
- 核对 npm dist-tag 与精确版本，以目标版本的官方源码和实际发行包复核 skill 的建议；区分类型检查、插件挂载和真实功能验证。版本卡缺失或与官方实现冲突时，明确记录验证缺口。

## 发版规则

- 用户说“发版”时，直接在干净且与远端同步的 `main` 上按 SemVer 更新 `package.json` 和 `CHANGELOG.md`，然后停止并请用户审阅。
- 用户说“继续”后，重新读取并保留其审阅修改，完成构建与检查，提交 `chore(release): vX.Y.Z`，运行 `pnpm release:check`，推送 `main` 并等待 CI。
- CI 通过后创建并推送 annotated tag `vX.Y.Z`；workflow 只负责校验、发布同一 tarball 到 npm 并创建 GitHub Release，完成后核对版本和产物一致。
