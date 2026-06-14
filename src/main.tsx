/* v8 ignore start -- @preserve */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/app'

const rootElement = document.querySelector('#root')
if (rootElement === null) throw new Error('Root element not found')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
