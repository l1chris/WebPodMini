import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import IPod from './components/IPod'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IPod />
  </StrictMode>,
)
