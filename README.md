# dsh-share

把 DSH 中的一轮问答生成 PNG 图片，可直接复制到剪贴板或下载。

## 现在怎么工作

插件会观察聊天页面，在每轮回答末尾的“复制 / 分支”操作区加入分享按钮。点击按钮后会打开图片预览，生成完成后可以：

- 复制图片到剪贴板
- 下载 PNG 文件

生成图片时会复用页面里已经渲染好的 Markdown、代码块和图片，因此视觉效果会尽量贴近当前 DSH 主题。

预览窗口还可以调整输出尺寸：

| 设置 | 可选值 |
| --- | --- |
| 宽度 | 手机 375px、平板 520px、电脑 640px |
| 字号 | 标准 16px、大 18px、超大 20px |

默认使用“手机 + 标准字号”，PNG 仍按 2× 分辨率导出。修改宽度或字号后会自动重新生成预览，选择结果保存在当前浏览器中。

## 安装到本地 DSH

先构建插件：

```bash
pnpm install
pnpm build
```

再安装到 DSH 的 Web profile：

```bash
dsh plugin --profile web add -w \
  --ignore-scripts --config.auto-install-peers=false \
  'file:/Users/digua/open-source/dsh/dsh-share'
```

如果没有全局 `dsh` 命令，可以在当前 DSH 源码目录中运行同一个安装入口：

```bash
cd /Users/digua/open-source/dsh/test-hellodigua
node --import tsx/esm apps/cli/src/bin.ts plugin --profile web add -w \
  --ignore-scripts --config.auto-install-peers=false \
  'file:/Users/digua/open-source/dsh/dsh-share'
```

安装后需要重启 Web Host。使用 `file:` 安装时，本地开发的每次修改都要重新执行 `pnpm build`，然后强制刷新 profile 里的本地包：

```bash
dsh plugin --profile web add -w --force \
  --ignore-scripts --config.auto-install-peers=false \
  'file:/Users/digua/open-source/dsh/dsh-share'
```

## 开发

```bash
pnpm typecheck
pnpm test
pnpm build
```

## 已知限制

DSH 目前没有给消息操作区提供正式的插件插槽。本插件暂时通过 `MutationObserver` 和页面的 `data-*` 属性找到操作区，因此属于兼容方案：如果 DSH 调整聊天 DOM 结构，需要同步更新 `src/client/dom.ts`。

复制图片依赖浏览器的 Clipboard API。如果浏览器或当前页面权限不允许写入图片，仍可以使用“下载 PNG”。
