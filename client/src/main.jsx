import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode double-invokes effects in development only (mount, unmount,
// remount) to help catch side effects that aren't safe to run twice — e.g.
// it's why the Network tab shows two GET /get-all-suggestions calls on
// first load in dev. It has no effect on the production build.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
