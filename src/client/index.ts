import type { ClientContext, ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
import type { LocaleSnapshot } from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { IconShareOutline16, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { createElement, Fragment, type MouseEvent as ReactMouseEvent, type ReactElement } from 'react'
import { t } from './i18n.ts'
import {
  createShareRuntime,
  type ShareRuntime,
  type ShareSelectionSnapshot,
} from './runtime.ts'

export const name = 'dsh-share/client'
export const inject = ['slots', 'locale']

interface ShareRuntimeInjected {
  hooks: {
    shareLocale: ObservableSnapshot<LocaleSnapshot>
    shareSelection: ObservableSnapshot<ShareSelectionSnapshot>
  }
  shareRuntime: ShareRuntime
}

export type ShareActionProps =
  PropsRuntime<'conversation.chat.assistant-actions'>
  & InjectFace<ShareRuntimeInjected>

export type ShareConversationActionProps =
  PropsRuntime<'conversation.session.header.utilities'>
  & InjectFace<ShareRuntimeInjected>

/** 官方 assistant-actions 插槽中的分享入口。 */
export function ShareAction({
  sessionId, shareRuntime, useShareLocale,
}: ShareActionProps): ReactElement {
  const strings = t(useShareLocale(snapshot => snapshot.active))
  const button = createElement('button',
    {
      type: 'button',
      'data-dsh-share-button': '',
      'aria-label': strings.share,
      onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
        const turnValue = event.currentTarget.closest<HTMLElement>('[data-turn-tail]')?.dataset.turnTail
        const turn = Number(turnValue)
        if (turnValue === undefined || !Number.isFinite(turn)) return
        shareRuntime.enterSelection(String(sessionId), event.currentTarget, turn)
      },
    },
    createElement(IconShareOutline16, { size: 16 }),
  )
  return createElement(Tooltip, { label: strings.shareTooltip, side: 'bottom', children: button })
}

/** 官方 Session Header 右侧 utilities 插槽中的多轮分享入口。 */
export function ShareConversationAction({
  sessionId, shareRuntime, useShareLocale, useShareSelection,
}: ShareConversationActionProps): ReactElement {
  const strings = t(useShareLocale(snapshot => snapshot.active))
  const selectionActive = useShareSelection(snapshot => snapshot.active)
  if (selectionActive) return createElement(Fragment)
  const button = createElement('button', {
      type: 'button',
      'data-dsh-share-conversation': '',
      'aria-label': strings.shareConversation,
      onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
        shareRuntime.enterSelection(String(sessionId), event.currentTarget)
      },
    }, createElement(IconShareOutline16, { size: 16 }))
  return createElement(Tooltip, { label: strings.shareConversation, side: 'bottom', children: button })
}

export function apply(ctx: ClientContext): void {
  let sharedRuntime: ShareRuntime | undefined
  let registrations = 0
  const runtimeForRegistration = (): ShareRuntime => {
    sharedRuntime ??= createShareRuntime(document, {
      getLocale: () => ctx.locale.getLocale().active,
      subscribeLocale: listener => ctx.locale.subscribe(listener),
    })
    return sharedRuntime
  }
  const injectFace = (sessionId: unknown): ShareRuntimeInjected => {
    const runtime = runtimeForRegistration()
    return {
      hooks: {
        shareLocale: ctx.locale,
        shareSelection: runtime.selectionFor(String(sessionId)),
      },
      shareRuntime: runtime,
    }
  }
  const cleanup = (disposeRegistration: () => void): (() => void) => {
    registrations += 1
    return () => {
      disposeRegistration()
      registrations -= 1
      if (registrations === 0) {
        sharedRuntime?.dispose()
        sharedRuntime = undefined
      }
    }
  }
  ctx.slots.inject('conversation.chat.assistant-actions', () => {
    const disposeRegistration = ctx.slots.register({
      name: 'conversation.chat.assistant-actions',
      id: 'share',
      order: 20,
      inject: injectFace,
    }, ShareAction)
    return cleanup(disposeRegistration)
  })
  ctx.slots.inject('conversation.session.header.utilities', () => {
    const disposeRegistration = ctx.slots.register({
      name: 'conversation.session.header.utilities',
      id: 'share-conversation',
      order: -10,
      inject: injectFace,
    }, ShareConversationAction)
    return cleanup(disposeRegistration)
  })
}

export { createShareCard } from './card.ts'
export { createShareMarkdown } from './markdown.ts'
export { findTurnContent, findTurnContentFromAction } from './dom.ts'
export { renderShareImage, type ImageRenderer } from './preview-dialog.ts'
export {
  createShareRuntime,
  type InstallOptions,
  type ShareRuntime,
  type ShareSelectionSnapshot,
} from './runtime.ts'
export {
  DEFAULT_SHARE_SETTINGS,
  FONT_SIZE_PRESETS,
  loadShareSettings,
  saveShareSettings,
  WIDTH_PRESETS,
  type FontSizePreset,
  type ShareSettings,
  type WidthPreset,
} from './settings.ts'
