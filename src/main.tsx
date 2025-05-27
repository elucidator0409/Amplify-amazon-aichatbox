import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import outputs from '../amplify_outputs.json'
import { Amplify } from 'aws-amplify'

Amplify.configure(outputs)

// Hàm đổi theme toàn app
export function setTheme(theme: 'light' | 'dark') {
  document.body.classList.toggle('dark-theme', theme === 'dark');
}

createRoot(document.getElementById('root')!).render(
  <Authenticator>
    <App />
  </Authenticator>
)
