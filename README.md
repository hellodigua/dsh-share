# dsh-share

简体中文 | [English](./README.en.md)

DSH 对话分享插件，分享单轮或多轮对话，可导出为图片或 Markdown。

和 DeepSeek 网页端一致的多选交互，同时支持将所选问答下载为 Markdown。

![dsh-share 多轮问答选择](./assets/readme/share-selection.webp)

生成图片前可调整宽度、字号和过程显示，完成后可下载或复制图片。

![dsh-share 生成图片](./assets/readme/share-dialog.webp)

## 功能

- 从右上角进入问答选择模式，默认全选
- 每轮的分享按钮也会进入选择模式，并只预选当前问答
- 问题和回答两侧都有联动勾选框，也可直接点击内容整组选择，支持不连续选择
- 勾选框会在长内容滚动时吸附在页面上，到当前问题或回答末尾再移出
- 可复制图片、下载 PNG 或 Markdown
- 保留 Markdown、代码块、表格、图片和工具调用摘要
- 可调整图片宽度和字号，长图支持滚动预览
- 可勾选“不展示过程”，只保留提问和最终回答

默认使用“平板 + 标准字号”，设置会自动保存在浏览器中。

## 快速安装

使用 DSH CLI 把插件加入 Web Profile，然后重启 `dsh web`：

```sh
dsh plugin --profile web add dsh-share
```

## 其他安装方式

### 从 GitHub 安装

```sh
dsh plugin --profile web add github:hellodigua/dsh-share#vX.Y.Z
```

仓库已经提交 `lib/` 构建产物，安装时无需在本机编译。

### 从本地 checkout 安装

```sh
git clone https://github.com/hellodigua/dsh-share.git
cd dsh-share

dsh plugin --profile web add .
```

修改源码后先运行 `corepack pnpm build`，再强制刷新 profile 中的本地包：

```sh
corepack pnpm build

dsh plugin --profile web add --force .
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
  /absolute/path/to/local-plugins/dsh-share-X.Y.Z.tgz
```

tarball 已包含浏览器构建产物，安装时不需要执行第三方构建脚本。

## 兼容性

当前版本面向 npm `@deepseek-ai/dsh@0.1.0-rc.6`，DSH peers 声明为 `^0.1.0-rc.6`。本地开发使用精确 rc.6 类型包，部署时仍由 Web Profile 提供共享运行时。

单轮入口通过官方 `conversation.chat.assistant-actions` 插槽挂载，对话分享入口通过官方 `conversation.session.header.utilities` 插槽挂载，并直接使用官方 Client 类型，不扫描或修改按钮栏 DOM。

DSH 暂未提供问答左侧装饰插槽。只有进入选择模式后，插件才会通过 `MutationObserver` 和官方页面稳定的 `data-conversation-scroll`、`data-chat-flow-kind`、`data-turn-tail` 属性，为已经渲染的问题和回答分别添加联动、可吸附的选择框；不依赖 CSS Module 生成的类名。选择模式中，内容里的链接、展开按钮等交互会暂时停用，点击问题或回答会切换整组选择，退出后恢复。DSH 调整这些页面数据属性或对话结构后，插件可能需要同步适配。

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

发布前使用 `corepack pnpm release:check` 校验 npm 包边界，GitHub → npm 的自动化约定见 [RELEASING.md](https://github.com/hellodigua/dsh-share/blob/main/RELEASING.md)。

## 已知限制

- 复制图片依赖浏览器 Clipboard API；权限不足时仍可下载 PNG。
- 图片中的远程资源必须允许浏览器读取；无法读取的单个资源会用透明占位跳过，不影响整张 PNG 生成。
- 超长图片在其他聊天软件中仍可能被整体缩放；插件弹窗只负责提供可滚动的清晰预览。
- 问答组选择以页面已经加载的完整轮次为准；需要更早内容时，先向上滚动加载历史消息。

## License

项目使用 [MIT](LICENSE) 许可证。浏览器 bundle 内联依赖的许可证见 [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)。

## 友情链接

已加入 [dshfind.com](https://dshfind.com) DSH 插件超市。
