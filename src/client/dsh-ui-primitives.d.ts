declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ReactElement } from 'react'

  /** DSH 官方 16px 分享图标；与复制、分支按钮使用同一套图标规范。 */
  export function IconShareOutline16(props: {
    size?: number
    className?: string
  }): ReactElement

  /** 多选模式使用官方勾选图标，外框由插件按操作栏尺寸绘制。 */
  export function IconCheckOutline16(props: {
    size?: number
    className?: string
  }): ReactElement

  /** DSH 运行时提供的官方 Tooltip；这里只声明插件实际使用的最小类型边界。 */
  export function Tooltip(props: {
    label: string | (() => string)
    side?: 'right' | 'bottom' | 'top'
    children: ReactElement
  }): ReactElement
}
