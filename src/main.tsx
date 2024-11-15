import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './context/task-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <App />
  </TaskProvider>
)
