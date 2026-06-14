import { render } from '@testing-library/react'
import { App } from './app'

describe(App, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)
    expect(baseElement).toBeDefined()
  })

  it('should have a heading', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app-heading')).toBeDefined()
  })
})
