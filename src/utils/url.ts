const hexRadix = 16
const padLength = 2

function toBase64(str: string) {
  return globalThis.btoa(encodeURIComponent(str).replaceAll(/%(?<hex>[0-9A-F]{2})/g, (_value: string, hex: string) => String.fromCodePoint(Number.parseInt(hex, hexRadix))))
}

function fromBase64(b64: string) {
  try {
    return decodeURIComponent(
      Array.from(globalThis.atob(b64))
        .map(char => `%${Number(char.codePointAt(0)).toString(hexRadix).padStart(padLength, '0')}`)
        .join(''),
    )
  } catch {
    return ''
  }
}

export function encodeForUrl(data: unknown) {
  return encodeURIComponent(toBase64(JSON.stringify(data)))
}

export function decodeFromUrl(str: string): unknown {
  try {
    const b64 = decodeURIComponent(str)
    const decoded = fromBase64(b64)
    return JSON.parse(decoded) as unknown
  } catch {
    return ''
  }
}
