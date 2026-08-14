# dsh-share

[简体中文](./README.md) | English

Share DSH Q&As or selected conversation groups as PNG or Markdown.

![dsh-share dialog preview](./assets/readme/share-dialog.webp)

## Features

- Enters Q&A selection from the top-right action, with all groups selected by default
- The share action below any turn opens the same selection mode with only that Q&A preselected
- Shows linked checkboxes beside both the question and answer, lets you click content to select a group, and supports non-contiguous selection
- Keeps a checkbox visible while scrolling through long content, then lets it leave at that question or answer's boundary
- Supports image copy, PNG download, and Markdown download
- Preserves Markdown, code blocks, tables, images, and tool call summaries
- Supports adjustable image widths and font sizes, with a scrollable preview for long images
- Can hide reasoning and tool calls, leaving only the question and final answer

The default is Tablet width with Standard font size. Your preferences are saved in the browser.

## Quick installation

Add the plugin to the Web Profile with the DSH CLI, then restart `dsh web`:

```sh
dsh plugin --profile web add dsh-share
```

Use `dsh-share@0.2.0` to pin this release. A plain `npm install dsh-share` only adds the package to the current Node.js project; it does not enable the DSH plugin.

## Other installation methods

### From GitHub

```sh
dsh plugin --profile web add github:hellodigua/dsh-share#v0.2.0
```

The repository includes the built `lib/` output, so installation does not require a local build.

### From a local checkout

```sh
git clone https://github.com/hellodigua/dsh-share.git
cd dsh-share

dsh plugin --profile web add .
```

After changing the source code, build it and force-refresh the local package in the profile:

```sh
corepack pnpm build

dsh plugin --profile web add --force .
```

### From a `local-plugins` tarball

The repository includes a prebuilt `lib/` directory. You can also package it like the other plugins in DSH's `local-plugins` directory:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm verify
mkdir -p ../local-plugins
corepack pnpm pack --pack-destination ../local-plugins
```

Then install the generated file:

```sh
dsh plugin --profile web add \
  /absolute/path/to/local-plugins/dsh-share-0.2.0.tgz
```

The tarball includes the browser bundle, so installation does not need to run third-party build scripts.

## Compatibility

This version targets npm `@deepseek-ai/dsh@0.1.0-rc.6` and declares DSH peers as `^0.1.0-rc.6`. Local development pins the exact rc.6 type packages, while the Web Profile still provides the shared runtime at deployment.

The single-turn entry is mounted through the official `conversation.chat.assistant-actions` slot, while the conversation entry uses `conversation.session.header.utilities`. Both are checked against the official Client types and do not scan or modify the action bar DOM.

DSH does not currently expose an additive slot for decorating the left side of a Q&A. Only while selection mode is active, the plugin uses a `MutationObserver` and the official page's stable `data-conversation-scroll`, `data-chat-flow-kind`, and `data-turn-tail` attributes to add linked, sticky checkboxes beside the rendered question and answer. It does not depend on CSS Module class names. Links, disclosure controls, and other content interactions are temporarily disabled in selection mode, so clicking a question or answer toggles its whole group; normal interaction returns after exiting. Changes to those data attributes or the conversation structure may require a plugin update.

## Development

You can install dependencies, run tests, and build the project without a local DSH checkout:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Run the full check with one command:

```sh
corepack pnpm verify
```

DSH loads the files in `lib/` directly, so they must be committed with the source. After changing `src/`, rebuild and make sure `lib/` is up to date.

Run `corepack pnpm release:check` before a release. See [RELEASING.md](https://github.com/hellodigua/dsh-share/blob/main/RELEASING.md) for the GitHub-to-npm automation contract.

## Known limitations

- Copying an image requires the browser Clipboard API. You can still download the PNG if clipboard permission is unavailable.
- Remote resources in the image must allow browser access. An unreadable resource is replaced with a transparent placeholder without stopping the rest of the image from rendering.
- Other chat apps may scale down very tall images. The plugin dialog only provides a clear, scrollable preview.
- Q&A group selection covers completed turns already loaded by the page. Scroll upward first when older history is needed.

## License

Licensed under the [MIT License](LICENSE). Licenses for dependencies bundled into the browser build are listed in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
