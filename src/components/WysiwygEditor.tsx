'use client'

import { useEffect, useRef } from 'react'

interface WysiwygEditorProps {
  value: string
  onChange: (html: string) => void
  minHeight?: number
}

type FormatCommand =
  | 'bold' | 'italic' | 'underline' | 'strikeThrough'
  | 'insertUnorderedList' | 'insertOrderedList'
  | 'justifyLeft' | 'justifyCenter' | 'justifyRight'

function exec(cmd: FormatCommand, value?: string) {
  document.execCommand(cmd, false, value)
}

const TOOLBAR: Array<{ label: string; title: string; cmd?: FormatCommand; block?: string; icon: string }> = [
  { label: 'B',  title: 'Bold',          cmd: 'bold',                icon: '<strong>B</strong>' },
  { label: 'I',  title: 'Italic',        cmd: 'italic',              icon: '<em>I</em>' },
  { label: 'U',  title: 'Underline',     cmd: 'underline',           icon: '<u>U</u>' },
  { label: 'S',  title: 'Strikethrough', cmd: 'strikeThrough',       icon: '<s>S</s>' },
  { label: 'H1', title: 'Heading 1',     block: 'h1',                icon: 'H1' },
  { label: 'H2', title: 'Heading 2',     block: 'h2',                icon: 'H2' },
  { label: 'H3', title: 'Heading 3',     block: 'h3',                icon: 'H3' },
  { label: 'UL', title: 'Bullet list',   cmd: 'insertUnorderedList', icon: '• List' },
  { label: 'OL', title: 'Numbered list', cmd: 'insertOrderedList',   icon: '1. List' },
  { label: '←',  title: 'Align left',   cmd: 'justifyLeft',         icon: '≡←' },
  { label: '≡',  title: 'Center',        cmd: 'justifyCenter',       icon: '≡' },
  { label: '→',  title: 'Align right',   cmd: 'justifyRight',        icon: '≡→' },
]

export default function WysiwygEditor({ value, onChange, minHeight = 420 }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalUpdate = useRef(false)
  // Save selection before toolbar buttons steal focus
  const savedRange = useRef<Range | null>(null)

  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (el.innerHTML !== value) {
      isInternalUpdate.current = true
      el.innerHTML = value
    }
  }, [value])

  function handleInput() {
    if (isInternalUpdate.current) { isInternalUpdate.current = false; return }
    onChange(editorRef.current?.innerHTML ?? '')
  }

  function saveSelection() {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange()
    }
  }

  function restoreSelection() {
    const sel = window.getSelection()
    if (sel && savedRange.current) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }

  function handleToolbar(item: typeof TOOLBAR[number]) {
    restoreSelection()
    editorRef.current?.focus()
    if (item.block) {
      document.execCommand('formatBlock', false, item.block)
    } else if (item.cmd) {
      exec(item.cmd)
    }
    onChange(editorRef.current?.innerHTML ?? '')
  }

  function handleInsertLink() {
    saveSelection()
    const sel = window.getSelection()
    const selectedText = sel?.toString().trim() ?? ''

    let url = prompt(
      'Enter URL or email address:',
      selectedText.includes('@') ? `mailto:${selectedText}` : selectedText.startsWith('http') ? selectedText : 'https://'
    )
    if (!url) return

    // Auto-prefix
    if (!url.startsWith('http') && !url.startsWith('mailto:') && !url.startsWith('#')) {
      if (url.includes('@')) {
        url = `mailto:${url}`
      } else {
        url = `https://${url}`
      }
    }

    restoreSelection()
    editorRef.current?.focus()

    const currentSel = window.getSelection()
    if (currentSel && currentSel.rangeCount > 0 && !currentSel.isCollapsed) {
      // Text is selected — wrap it in an anchor with the EXACT selected range
      const range = currentSel.getRangeAt(0)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.target = url.startsWith('mailto:') ? '_self' : '_blank'
      anchor.rel = 'noopener noreferrer'
      range.surroundContents(anchor)
      currentSel.removeAllRanges()
      onChange(editorRef.current?.innerHTML ?? '')
    } else {
      // No selection — insert the URL as a clickable link
      const displayText = url.startsWith('mailto:') ? url.slice(7) : url
      document.execCommand('insertHTML', false, `<a href="${url}">${displayText}</a>`)
      onChange(editorRef.current?.innerHTML ?? '')
    }
  }

  function handleRemoveLink() {
    restoreSelection()
    editorRef.current?.focus()
    document.execCommand('unlink', false)
    onChange(editorRef.current?.innerHTML ?? '')
  }

  const btnBase: React.CSSProperties = {
    padding: '5px 10px', fontSize: 13, fontWeight: 600,
    background: '#f3f4f6', border: '1px solid #e5e7eb',
    borderRadius: 6, cursor: 'pointer', color: '#1a1a2e',
    lineHeight: 1, whiteSpace: 'nowrap',
    transition: 'background 0.15s',
  }

  return (
    <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 12, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 14px',
        background: '#f9fafb', borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        {TOOLBAR.map((item) => (
          <button
            key={item.label}
            title={item.title}
            type="button"
            onMouseDown={(e) => { e.preventDefault(); handleToolbar(item) }}
            style={btnBase}
            onMouseOver={e => (e.currentTarget.style.background = '#e5e7eb')}
            onMouseOut={e => (e.currentTarget.style.background = '#f3f4f6')}
            dangerouslySetInnerHTML={{ __html: item.icon }}
          />
        ))}

        {/* Separator */}
        <div style={{ width: 1, background: '#e5e7eb', margin: '2px 2px' }} />

        {/* Link button */}
        <button
          type="button"
          title="Insert / edit link"
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); handleInsertLink() }}
          style={{ ...btnBase, color: '#2563eb' }}
          onMouseOver={e => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseOut={e => (e.currentTarget.style.background = '#f3f4f6')}
        >
          🔗 Link
        </button>

        {/* Unlink button */}
        <button
          type="button"
          title="Remove link"
          onMouseDown={(e) => { e.preventDefault(); handleRemoveLink() }}
          style={{ ...btnBase, color: '#dc2626' }}
          onMouseOver={e => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseOut={e => (e.currentTarget.style.background = '#f3f4f6')}
        >
          ✂ Unlink
        </button>

        {/* Separator */}
        <div style={{ width: 1, background: '#e5e7eb', margin: '2px 2px' }} />

        <button
          type="button"
          title="Clear formatting"
          onMouseDown={(e) => {
            e.preventDefault()
            document.execCommand('removeFormat', false)
            onChange(editorRef.current?.innerHTML ?? '')
          }}
          style={{ ...btnBase, color: '#6b7280' }}
          onMouseOver={e => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseOut={e => (e.currentTarget.style.background = '#f3f4f6')}
        >
          Clear
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        style={{
          minHeight, padding: '20px 24px',
          outline: 'none', fontSize: 15, lineHeight: 1.7,
          color: '#1a1a2e', background: '#fff',
          overflowY: 'auto',
        }}
      />
    </div>
  )
}
