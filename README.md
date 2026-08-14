# dsh-share

简体中文 | [English](./README.en.md)

把 DSH 中的一轮问答生成 PNG 图片，可直接复制到剪贴板或下载，不修改 DSH 核心代码。

![dsh-share 分享图片预览](./assets/readme/share-dialog.webp)

## 功能

- 在每轮回答末尾增加分享按钮，可复制或下载 PNG
- 保留 Markdown、代码块、表格、图片和工具调用摘要
- 可调整图片宽度和字号，长图支持滚动预览
- 可勾选“不展示过程”，只保留提问和最终回答

默认使用“平板 + 标准字号”，设置会自动保存在浏览器中。

## 安装

### 从 GitHub tag 安装

建议固定版本，避免仓库后续更新改变已经安装的代码：

```sh
dsh plugin --profile web add \
  --ignore-scripts --config.auto-install-peers=false \
  'github:hellodigua/dsh-share#v0.1.0'
```

安装完成后重启 `dsh web`。

### 从本地 checkout 安装

```sh
git clone https://github.com/hellodigua/dsh-share.git
cd dsh-share

dsh plugin --profile web add \
  --ignore-scripts --config.auto-install-peers=false \
  .
```

修改源码后先运行 `corepack pnpm build`，再强制刷新 profile 中的本地包：

```sh
corepack pnpm build

dsh plugin --profile web add --force \
  --ignore-scripts --config.auto-install-peers=false \
  .
```

### 从 `local-plugins` tarball 安装

仓库提交了预构建的 `lib/`，也可以打包成和 DSH `local-plugins` 目录中其他插件相同的 tarball：

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm verify
mkdir -p ../local-plugins
corepack pnpm pack --pack-destination ../local-plugins
```

然后安装生成的文件：

```sh
dsh plugin --profile web add \
  --ignore-scripts --config.auto-install-peers=false \
  /absolute/path/to/local-plugins/dsh-external-dsh-share-0.1.0.tgz
```

tarball 已包含浏览器构建产物，安装时不需要执行第三方构建脚本。

## 兼容性

当前版本面向 npm `@deepseek-ai/dsh@0.1.0-rc.6`，DSH peers 声明为 `^0.1.0-rc.6`。本地开发使用精确 rc.6 类型包，部署时仍由 Web Profile 提供共享运行时。

分享按钮通过官方 `conversation.chat.assistant-actions` 插槽挂载，并直接使用官方 Client 类型，不扫描或修改按钮栏 DOM。生成图片时会读取当前轮已经渲染的 `data-*` 节点，因此 DSH 调整对话内容结构后可能需要同步适配。

## 开发

项目不依赖本机 DSH checkout 即可安装依赖、运行测试和构建：

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

也可以用一条命令执行完整检查：

```sh
corepack pnpm verify
```

`lib/` 是 DSH 直接加载的交付物，需要和源码一起提交。修改 `src/` 后，请重新构建并确认 `lib/` 已同步更新。

## 已知限制

- 复制图片依赖浏览器 Clipboard API；权限不足时仍可下载 PNG。
- 图片中的远程资源必须允许浏览器读取；无法读取的单个资源会用透明占位跳过，不影响整张 PNG 生成。
- 超长图片在其他聊天软件中仍可能被整体缩放；插件弹窗只负责提供可滚动的清晰预览。

## License

项目使用 [MIT](LICENSE) 许可证。浏览器 bundle 内联依赖的许可证见 [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)。
