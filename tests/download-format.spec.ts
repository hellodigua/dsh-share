// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { mountDownloadFormat } from '../src/client/download-format.ts'

afterEach(() => { document.body.innerHTML = '' })

it('选择格式不触发下载，更新语言保留选择，禁用及卸载清理菜单', async () => {
  const element = document.createElement('span')
  document.body.append(element)
  const change = vi.fn()
  const handle = mountDownloadFormat(element, change)
  try {
    handle.update('zh', false)
    await vi.waitFor(() => expect(element.querySelector('button')).not.toBeNull())
    const trigger = () => element.querySelector<HTMLButtonElement>('[data-dsh-share-format-trigger]')!
    expect(trigger().textContent).toBe('Markdown')
    trigger().click()
    await vi.waitFor(() => expect(element.querySelector('[role="menu"]')).not.toBeNull())
    const options = element.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')
    options[1]!.click()
    expect(change).toHaveBeenCalledExactlyOnceWith('html')
    await vi.waitFor(() => expect(trigger().textContent).toBe('HTML'))
    handle.update('en', false)
    await vi.waitFor(() => expect(trigger().ariaLabel).toBe('Download format: HTML'))
    trigger().click()
    await vi.waitFor(() => expect(element.querySelector('[role="menu"]')).not.toBeNull())
    handle.update('en', true)
    await vi.waitFor(() => expect(trigger().disabled).toBe(true))
    expect(element.querySelector('[role="menu"]')).toBeNull()
    expect(trigger().getAttribute('aria-expanded')).toBe('false')
    handle.update('en', false)
    await vi.waitFor(() => expect(trigger().disabled).toBe(false))
    expect(trigger().textContent).toBe('HTML')
    trigger().click()
    await vi.waitFor(() => expect(element.querySelector('[role="menu"]')).not.toBeNull())
  } finally {
    handle.dispose()
  }
  expect(element.children).toHaveLength(0)
})
