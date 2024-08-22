import React from 'react'
import type { RenderLeafProps } from 'slate-react'

// Custom html css highlight content

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.highlight && !leaf.highlightTag) {
    return (
      <a {...attributes} href='#' className='bg-blue-300 text-black'>
        {children}
      </a>
    )
  }

  if (leaf.highlight && leaf.highlightTag) {
    return (
      <a {...attributes} href='#' className='cursor-pointer text-blue-500 hover:underline'>
        {children}
      </a>
    )
  }

  return <span {...attributes}>{children}</span>
}

export default Leaf
