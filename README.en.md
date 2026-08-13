# dsh-share

[简体中文](./README.md) | English

Turn a question-and-answer exchange in DSH into a PNG image. Copy it to the clipboard or download it without modifying DSH core.

![dsh-share dialog preview](./assets/readme/share-dialog.webp)

## Features

- Adds a share button to the end of each assistant response
- Copies or downloads the conversation as a PNG image
- Preserves Markdown, code blocks, tables, images, and tool call summaries
- Supports adjustable image widths and font sizes, with a scrollable preview for long images
- Can hide reasoning and tool calls, leaving only the question and final answer

The default is Tablet width with Standard font size. Your preferences are saved in the browser.

## Installation

### From a GitHub tag

Pinning a version is recommended so future repository updates do not change the installed code:

```sh
dsh plugin --profile web add \
  --ignore-scripts --config.auto-install-peers=false \
  'github:hellodigua/dsh-share#v0.1.0'
```

Restart `dsh web` after installation.

### From a local checkout

```sh
git clone https://github.com/hellodigua/dsh-share.git
cd dsh-share

dsh plugin --profile web add \
  --ignore-scripts --config.auto-install-peers=false \
  .
```

After changing the source code, build it and force-refresh the local package in the profile:

```sh
corepack pnpm build

dsh plugin --profile web add --force \
  --ignore-scripts --config.auto-install-peers=false \
  .
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
  --ignore-scripts --config.auto-install-peers=false \
  /absolute/path/to/local-plugins/dsh-external-dsh-share-0.1.0.tgz
```

The tarball includes the browser bundle, so installation does not need to run third-party build scripts.

## Compatibility

This version uses the official message action slot introduced in DSH commit `7b9644f2b664`.

The share button is mounted through `conversation.chat.assistant-actions` and no longer scans or modifies the action bar DOM. Image generation still reads the rendered `data-*` nodes for the current turn, so changes to DSH's conversation content structure may require an update to this plugin.

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

## Known limitations

- Copying an image requires the browser Clipboard API. You can still download the PNG if clipboard permission is unavailable.
- Remote resources in the image must allow browser access. An unreadable resource is replaced with a transparent placeholder without stopping the rest of the image from rendering.
- Other chat apps may scale down very tall images. The plugin dialog only provides a clear, scrollable preview.

## License

Licensed under the [MIT License](LICENSE). Licenses for dependencies bundled into the browser build are listed in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
