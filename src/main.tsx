import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IPod from '../lib/components/IPod'
import './main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IPod />
  </StrictMode>,
)
