import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

import { StarknetProvider } from "./StarknetConfig";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StarknetProvider>
      <App />
      <SpeedInsights />
      <Analytics />
    </StarknetProvider>
  </StrictMode>,
)
