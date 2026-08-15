export const STYLE_ID = 'dsh-share-style'

export const STYLE_TEXT: string = `
[data-dsh-share-button] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 28px;
  color: var(--dsw-alias-label-tertiary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  margin: 0;
  padding: 6px;
  width: 28px;
}
/* 官方 slot 固定在分支按钮前；只调整 flex 视觉顺序，不移动 React 管理的 DOM。 */
[data-dsh-share-button] { order: 1; }
[data-time-hover-root] > div:has([data-dsh-share-button]) > span:last-child { order: 2; }
[data-dsh-share-button]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12));
  color: var(--dsw-alias-label-secondary, currentColor);
  opacity: 1;
}
[data-dsh-share-button]:disabled { cursor: wait; opacity: .38; }
[data-dsh-share-conversation] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  padding: 0;
  width: 34px;
}
[data-dsh-share-conversation]:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }

/* DeepSeek 官网式选择模式：一轮问答作为一组，常规操作和输入区让位给底栏。 */
[data-conversation-scroll][data-dsh-share-selection] [data-composer-seat],
[data-conversation-scroll][data-dsh-share-selection] [data-chat-flow-kind="turn-tail"] {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="user"] [data-time-hover-root] > :last-child:has(button),
[data-conversation-scroll][data-dsh-share-selection]
  [data-chat-flow-kind="steering"] [data-time-hover-root] > :last-child:has(button) {
  pointer-events: none !important;
  visibility: hidden !important;
}
[data-dsh-share-select-anchor],
[data-dsh-share-select-range-root] { position: relative !important; }
[data-conversation-scroll][data-dsh-share-selection] [data-dsh-share-select-content] {
  cursor: pointer !important;
}
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]),
[data-conversation-scroll][data-dsh-share-selection]
  [data-dsh-share-select-content] > :not([data-dsh-share-select-region]) * {
  cursor: pointer !important;
  pointer-events: none !important;
}
[data-dsh-share-select-region="question"] {
  height: 44px;
  margin-bottom: -44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
  z-index: 2;
}
[data-dsh-share-select-region="answer"] {
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 2;
}
[data-dsh-share-select-sticky] {
  height: 44px;
  pointer-events: none;
  position: sticky;
  top: 0;
  width: 0;
}
[data-dsh-share-turn-select] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  left: -42px;
  margin: 0;
  padding: 0;
  pointer-events: auto;
  position: absolute;
  top: 0;
  width: 18px;
  z-index: 2;
}
[data-dsh-share-turn-select-box],
[data-dsh-share-select-all-box] {
  align-items: center;
  border: 1.5px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .48));
  border-radius: 6px;
  box-sizing: border-box;
  display: inline-flex;
  height: 18px;
  justify-content: center;
  position: relative;
  width: 18px;
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box],
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box] {
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border-color: var(--dsw-static-deepseek-500, #4d6bfe);
}
[data-dsh-share-turn-select][aria-checked="true"] [data-dsh-share-turn-select-box]::after,
[data-dsh-share-select-all][aria-checked="true"] [data-dsh-share-select-all-box]::after {
  border-bottom: 1.8px solid #fff;
  border-right: 1.8px solid #fff;
  content: '';
  height: 8px;
  transform: rotate(45deg) translate(-1px, -1px);
  width: 4px;
}
[data-dsh-share-turn-select]:focus-visible [data-dsh-share-turn-select-box],
[data-dsh-share-select-all]:focus-visible [data-dsh-share-select-all-box] {
  outline: 2px solid var(--dsw-alias-button-info-fill, #4d6bfe);
  outline-offset: 2px;
}
[data-dsh-share-selection-footer] {
  align-items: center;
  background: var(--dsw-alias-bg-base, #fff);
  border-top: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, .18));
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex: none;
  height: 66px;
  justify-content: center;
  margin-top: -66px;
  position: sticky;
  width: 100%;
  z-index: 9;
}
[data-dsh-share-selection-footer-inner] {
  align-items: center;
  display: flex;
  gap: 8px;
  max-width: 840px;
  width: min(840px, calc(100% - 64px));
}
[data-dsh-share-select-all] {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--dsw-alias-label-primary, currentColor);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13px;
  gap: 10px;
  height: 36px;
  padding: 0 2px;
}
[data-dsh-share-selection-divider] {
  background: var(--dsw-alias-border-l2, rgba(127, 127, 127, .24));
  height: 18px;
  margin: 0 8px 0 6px;
  width: 1px;
}
[data-dsh-share-selection-count] {
  color: var(--dsw-alias-label-primary, currentColor);
  flex: 1 1 auto;
  font-size: 14px;
  line-height: 22px;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown],
[data-dsh-share-selection-create] {
  appearance: none;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  height: 36px;
  line-height: 22px;
  padding: 6px 18px;
  white-space: nowrap;
}
[data-dsh-share-selection-cancel],
[data-dsh-share-selection-markdown] {
  background: transparent;
  border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, .4));
  color: var(--dsw-alias-label-primary, currentColor);
}
[data-dsh-share-selection-cancel] {
  min-width: 72px;
}
[data-dsh-share-selection-create] {
  align-items: center;
  background: var(--dsw-static-deepseek-500, #4d6bfe);
  border: 1px solid var(--dsw-static-deepseek-500, #4d6bfe);
  color: #fff;
  display: inline-flex;
  justify-content: center;
  min-width: 132px;
}
[data-dsh-share-selection-cancel]:hover,
[data-dsh-share-selection-markdown]:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .12)); }
[data-dsh-share-selection-create]:hover:not(:disabled) { background: #405bea; border-color: #405bea; }
[data-dsh-share-selection-markdown]:disabled,
[data-dsh-share-selection-create]:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-label="compact"] { display: none; }
@media (max-width: 720px) {
  [data-dsh-share-selection-footer] {
    height: 108px;
    margin-top: -108px;
    padding: 10px 0;
  }
  [data-dsh-share-selection-footer-inner] {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, 36px);
    width: calc(100% - 32px);
  }
  [data-dsh-share-select-all] {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
  }
  [data-dsh-share-selection-divider] { display: none; }
  [data-dsh-share-selection-count] {
    font-size: 13px;
    grid-column: 2 / 4;
    grid-row: 1;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  [data-dsh-share-selection-cancel],
  [data-dsh-share-selection-markdown],
  [data-dsh-share-selection-create] {
    font-size: 13px;
    grid-row: 2;
    min-width: 0;
    padding-inline: 6px;
    width: 100%;
  }
  [data-dsh-share-selection-cancel] { grid-column: 1; }
  [data-dsh-share-selection-markdown] { grid-column: 2; }
  [data-dsh-share-selection-create] { grid-column: 3; }
  [data-dsh-share-label="wide"] { display: none; }
  [data-dsh-share-label="compact"] { display: inline; }
}
[data-dsh-share-dialog] {
  background: var(--dsw-alias-bg-base, #fff);
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .22));
  border-radius: 14px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, .24);
  color: var(--dsw-alias-label-primary, #111827);
  max-height: min(86vh, 900px);
  max-width: calc(100vw - 32px);
  overflow: hidden;
  padding: 0;
  width: 960px;
}
[data-dsh-share-dialog][open] { display: flex; flex-direction: column; }
[data-dsh-share-dialog]::backdrop { background: rgba(0, 0, 0, .48); }
.dsh-share-dialog__header {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  font-size: 16px;
  font-weight: 650;
  justify-content: space-between;
  padding: 16px 18px;
}
.dsh-share-dialog__close {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: inherit;
  cursor: pointer;
  font-size: 22px;
  height: 30px;
  line-height: 1;
  width: 30px;
}
.dsh-share-dialog__close:hover { background: rgba(127, 127, 127, .12); }
.dsh-share-dialog__controls {
  align-items: center;
  border-bottom: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding: 12px 18px;
}
.dsh-share-dialog__field {
  align-items: center;
  display: flex;
  gap: 8px;
}
.dsh-share-dialog__field-label {
  color: var(--dsw-alias-label-secondary, #6b7280);
  font-size: 13px;
  white-space: nowrap;
}
.dsh-share-dialog__toggle {
  align-items: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  gap: 7px;
  margin-left: auto;
  user-select: none;
  white-space: nowrap;
}
.dsh-share-dialog__toggle input {
  accent-color: #4d6bfe;
  cursor: pointer;
  height: 15px;
  margin: 0;
  width: 15px;
}
.dsh-share-dialog__segmented {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .24));
  border-radius: 8px;
  display: inline-flex;
  gap: 2px;
  padding: 3px;
}
.dsh-share-dialog__choice {
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--dsw-alias-label-secondary, #6b7280);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  height: 28px;
  min-width: 38px;
  padding: 0 9px;
}
.dsh-share-dialog__choice:hover { background: rgba(127, 127, 127, .08); }
.dsh-share-dialog__choice[aria-pressed="true"] {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .14));
  color: var(--dsw-alias-label-primary, #111827);
}
.dsh-share-dialog__body {
  align-items: start;
  display: grid;
  flex: 1 1 auto;
  justify-items: center;
  max-height: 62vh;
  min-height: 220px;
  min-width: 0;
  overflow: auto;
  padding: 18px;
}
.dsh-share-dialog__preview {
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  box-sizing: border-box;
  display: block;
  height: auto;
  max-width: 100%;
}
.dsh-share-dialog__message {
  align-self: center;
  color: var(--dsw-alias-label-secondary, #6b7280);
  text-align: center;
}
.dsh-share-dialog__footer {
  align-items: center;
  border-top: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .18));
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  min-height: 68px;
  padding: 14px 18px;
}
.dsh-share-dialog__status { color: var(--dsw-alias-label-secondary, #6b7280); font-size: 13px; margin-right: auto; }
.dsh-share-dialog__action {
  background: transparent;
  border: 1px solid var(--dsw-alias-line-border, rgba(127, 127, 127, .28));
  border-radius: 8px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 8px 14px;
}
.dsh-share-dialog__action:hover { background: rgba(127, 127, 127, .10); }
.dsh-share-dialog__action--primary { background: #4d6bfe; border-color: #4d6bfe; color: #fff; }
.dsh-share-dialog__action--primary:hover { background: #405bea; }
.dsh-share-dialog__action:disabled { cursor: not-allowed; opacity: .45; }
[data-dsh-share-card] [data-dsh-share-message],
[data-dsh-share-card] [data-dsh-share-message] :where(div, span, p, li, table, blockquote, td, th) {
  font-size: var(--dsh-share-font-size) !important;
  line-height: 1.75 !important;
}
[data-dsh-share-card] [data-dsh-share-tool-summary],
[data-dsh-share-card] [data-dsh-share-tool-summary] :where(div, span) {
  font-size: 14px !important;
  line-height: 24px !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h1) {
  font-size: calc(var(--dsh-share-font-size) * 1.55) !important;
  line-height: 1.3 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h2) {
  font-size: calc(var(--dsh-share-font-size) * 1.28) !important;
  line-height: 1.35 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(h3, h4, h5, h6) {
  font-size: calc(var(--dsh-share-font-size) * 1.12) !important;
  line-height: 1.4 !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre, code, code *) {
  font-size: calc(var(--dsh-share-font-size) * .875) !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(pre) {
  max-width: 100% !important;
  overflow: visible !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(img, video, svg) { max-width: 100% !important; }
[data-dsh-share-card] [data-dsh-share-message] :where(table) {
  max-width: 100% !important;
  table-layout: fixed !important;
  width: 100% !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(th, td) {
  max-width: none !important;
  min-width: 0 !important;
  overflow-wrap: anywhere !important;
  padding: 8px 6px !important;
  word-break: break-word !important;
}
[data-dsh-share-card] [data-dsh-share-message] :where(div:has(> table)) {
  max-width: 100% !important;
  overflow: visible !important;
}
`
