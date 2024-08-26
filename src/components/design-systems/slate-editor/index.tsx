/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useCallback } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Node, Text } from 'slate'
import type { BaseEditor, BaseRange, Descendant } from 'slate'
import type { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory, type HistoryEditor } from 'slate-history'
import Leaf from './Leaf'
import Element from './Element'
import { cn } from '~/helpers'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface CustomRange extends BaseRange {
  highlight?: boolean
  highlightTag?: boolean
}

type CustomText = { text: string; highlight?: boolean; highlightTag?: boolean }
type ParagraphElement = { type: 'paragraph'; children: CustomText[] }
type CustomElement = ParagraphElement

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
    Range: CustomRange
  }
}

interface SlateEditorProps {
  className?: string
  placeholder?: string
  setValue?: UseFormSetValue<any>
  watch?: UseFormWatch<any>
  name?: string
  readOnly?: boolean
  valueSaleRender?: Array<Descendant>
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

// Trình hỗ trợ viết content video => mở rộng hastag + tag user

const SlateEditor = ({
  className,
  placeholder = '',
  watch,
  setValue,
  name,
  readOnly = false,
  valueSaleRender
}: SlateEditorProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const getInitialValue = () => {
    if (watch && name) {
      // Nếu cả watch và name đều có giá trị, ưu tiên giá trị từ watch(name)
      return valueSaleRender ?? watch(name)
    }
    // Nếu không, sử dụng valueSaleRender hoặc initialValue
    return valueSaleRender ?? initialValue
  }

  // Khởi tạo state với giá trị đã xác định
  const [valueSale, setValueSale] = useState<Descendant[]>(getInitialValue())

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])

  const decorate = useCallback(([node, path]: [Node, number[]]) => {
    const ranges: CustomRange[] = []

    if (Text.isText(node)) {
      const { text } = node
      // const parts = text.split(/(\s@[\w\u00C0-\u017F]+|\s#\w+)/gu)
      const parts = text.split(/(\s@[^\s#]+|\s#[^\s@]+)/gu)
      let offset = 0

      parts.forEach((part) => {
        if (part.startsWith(' @')) {
          ranges.push({
            anchor: { path, offset: offset + 1 },
            focus: { path, offset: offset + part.length },
            highlight: true,
            highlightTag: false
          })
        } else if (part.startsWith(' #')) {
          ranges.push({
            anchor: { path, offset: offset + 1 },
            focus: { path, offset: offset + part.length },
            highlight: true,
            highlightTag: true
          })
        }

        offset += part.length
      })
    }

    return ranges
  }, [])

  const handleOnChangeSlate = (newValue: Array<Descendant>) => {
    setValueSale(newValue)
    setValue && name && setValue(name, newValue)
  }

  return (
    <Slate editor={editor} initialValue={valueSale} onChange={handleOnChangeSlate}>
      <Editable
        className={cn('border-none text-black outline-none', className)}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Slate>
  )
}

export default SlateEditor
