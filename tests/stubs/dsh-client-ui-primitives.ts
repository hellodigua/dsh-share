import { createElement, type ReactElement } from 'react'

/** 单测用可识别节点代替官方图标，避免依赖 DSH 仓库。 */
export function IconShareOutline16({ size = 16 }: { size?: number }): ReactElement {
  return createElement('svg', { 'data-official-share-icon': '', height: size, width: size })
}

/** 单测只关心 Tooltip 收到的属性；真实交互由 DSH 官方组件负责。 */
export function Tooltip({ children }: { children: ReactElement }): ReactElement {
  return children
}
