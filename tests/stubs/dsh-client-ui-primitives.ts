import { createElement, Fragment, type ReactElement, type ReactNode } from 'react'

/** 单测用可识别节点代替官方图标，避免依赖 DSH 仓库。 */
export function IconShareOutlineRegular({ size = 16 }: { size?: number }): ReactElement {
  return createElement('svg', { 'data-official-share-icon': '', height: size, width: size })
}

export function IconCheckOutline16({ size = 16 }: { size?: number }): ReactElement {
  return createElement('svg', { 'data-official-check-icon': '', height: size, width: size })
}

/** 单测只关心 Tooltip 收到的属性；真实交互由 DSH 官方组件负责。 */
export function Tooltip({ children }: { children: ReactElement }): ReactElement {
  return children
}

export const IconChevronDownOutlineRegular = IconShareOutlineRegular

/** 测试格式选择的数据契约；宿主菜单的定位和键盘行为由真实组件验收。 */
export function Menu({ anchor, open, items, onSelect }: {
  anchor: ReactNode
  open: boolean
  items: { id: string, label: ReactNode }[]
  onSelect(id: string): void
}) {
  return createElement(Fragment, null, anchor, open ? createElement('div', { role: 'menu' },
    items.map(item => createElement('button', { key: item.id, role: 'menuitem', onClick: () => onSelect(item.id) }, item.label)),
  ) : null)
}
