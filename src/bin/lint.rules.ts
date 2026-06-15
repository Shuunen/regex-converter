import path from 'node:path'

const regexH1 = /^#\s+.+$/gm

export type Rule = {
  check: (content: string) => boolean
  error: string
  fixer?: (content: string, filePath: string) => string
  name: string
}

export function hasOneH1(content: string): boolean {
  const matches = content.match(regexH1)
  return Array.isArray(matches) && matches.length === 1
}

export function hasContent(content: string): boolean {
  const lines = content.split('\n').filter(line => line.trim().length > 0 && !line.startsWith('#'))
  return lines.length > 0
}

export function toHumanTitle(filePath: string): string {
  const baseName = path.basename(filePath, '.md')
  const words = baseName.split('-')
  const titleParts: string[] = []
  for (const word of words) if (word.length > 0) titleParts.push(word.charAt(0).toUpperCase() + word.slice(1))
  return titleParts.join(' ')
}

function ensureSingleH1(content: string, filePath: string): string {
  const lines = content.replaceAll('\r\n', '\n').split('\n')
  const hasH1 = lines.some(line => /^#\s+.+$/.test(line))
  if (hasH1) return `${lines.join('\n').replaceAll(/\n+$/g, '')}\n`
  const title = toHumanTitle(filePath)
  const headingLine = title.length > 0 ? `# ${title}` : '# README'
  return `${headingLine}\n\n${content.replaceAll('\r\n', '\n').replaceAll(/\n+$/g, '')}\n`
}

export const rules: Rule[] = [
  {
    check: hasOneH1,
    error: 'must contain exactly one first-level title (#)',
    fixer: (content: string, filePath: string) => ensureSingleH1(content, filePath),
    name: 'single H1',
  },
  {
    check: hasContent,
    error: 'must contain at least one non-empty, non-heading line',
    name: 'has content',
  },
]
