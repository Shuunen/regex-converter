import { render } from '@testing-library/react'
import { Converter } from './converter'

describe(Converter, () => {
  it('should log an error when history.replaceState throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockReturnValue(undefined)
    const replaceStateSpy = vi.spyOn(globalThis.history, 'replaceState').mockImplementation(() => {
      throw new Error('URL too long')
    })
    render(<Converter />)
    expect(errorSpy).toHaveBeenCalledWith('Failed to update URL, maybe too long ?', { error: expect.any(Error) })
    replaceStateSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
