export function highlightMatchedText(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<span class="text-primary">$1</span>')
}

// gi
// golbal: tìm kiếm toàn cục
// i: không phân biệt hoa thường (case-insensitive).
