import React from 'react'
import { RenderElementProps } from 'slate-react'

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
