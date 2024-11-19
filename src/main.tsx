import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IPod from './components/IPod'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IPod />
  </StrictMode>,
)
