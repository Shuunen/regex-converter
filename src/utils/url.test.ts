import { decodeFromUrl, encodeForUrl } from './url'

describe('url', () => {
  it('round-trips a plain object', () => {
    const data = { count: 1, label: 'hello' }
    expect(decodeFromUrl(encodeForUrl(data))).toStrictEqual(data)
  })

  it('round-trips a string with special characters', () => {
    const data = 'héllo wörld'
    expect(decodeFromUrl(encodeForUrl(data))).toBe(data)
  })

  it('decodeFromUrl returns empty string for invalid base64', () => {
    expect(decodeFromUrl(encodeURIComponent('!!!not-base64!!!'))).toBe('')
  })

  it('decodeFromUrl returns empty string for invalid percent-encoded input', () => {
    expect(decodeFromUrl('%GG')).toBe('')
  })
})
