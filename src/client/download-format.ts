import { createElement, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { IconChevronDownOutlineRegular, Menu } from '@deepseek-ai/dsh-client-ui-primitives'
import { t, type ShareLocale } from './i18n.ts'

export type DownloadFormat = 'markdown' | 'html'

interface FormatProps {
  locale: ShareLocale
  disabled: boolean
  onChange(format: DownloadFormat): void
}

/** 复用宿主菜单的定位、选中标记和键盘操作。 */
function FormatMenu({ locale, disabled, onChange }: FormatProps) {
  const [format, setFormat] = useState<DownloadFormat>('markdown')
  const [open, setOpen] = useState(false)
  useEffect(() => { if (disabled) setOpen(false) }, [disabled])
  return createElement(Menu, {
    open: open && !disabled,
    side: 'top',
    align: 'end',
    portal: true,
    selectedId: format,
    items: [{ id: 'markdown', label: 'Markdown' }, { id: 'html', label: 'HTML' }],
    onClose: () => setOpen(false),
    onSelect: id => {
      if (disabled || (id !== 'markdown' && id !== 'html')) return
      setFormat(id)
      setOpen(false)
      onChange(id)
    },
    anchor: createElement('button', {
      type: 'button',
      disabled,
      'data-dsh-share-format-trigger': '',
      'aria-label': `${t(locale).downloadFormat}: ${format === 'html' ? 'HTML' : 'Markdown'}`,
      'aria-haspopup': 'menu',
      'aria-expanded': open && !disabled,
      onClick: () => setOpen(value => !value),
    }, format === 'html' ? 'HTML' : 'Markdown', createElement(IconChevronDownOutlineRegular, { size: 14 })),
  })
}

/** 在独立节点挂载宿主React菜单，仅在输入变化时更新，避免观察器回环。 */
export function mountDownloadFormat(element: HTMLElement, onChange: FormatProps['onChange']) {
  const root = createRoot(element)
  let previous = ''
  return {
    update(locale: ShareLocale, disabled: boolean) {
      const key = `${locale}:${disabled}`
      if (key === previous) return
      previous = key
      root.render(createElement(FormatMenu, { locale, disabled, onChange }))
    },
    dispose() { root.unmount() },
  }
}
