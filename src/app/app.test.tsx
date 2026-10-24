import { render } from '@testing-library/react'
import { App } from './app'

// happy-dom rejects canceled Web Animations on unmount, motion then falls back to its JS animations
Reflect.deleteProperty(Element.prototype, 'animate')

describe(App, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeDefined()
  })

  it('should have a heading', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app-heading').tagName).toBe('H1')
  })
})
