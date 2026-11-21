import type { JSX } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './auth/AuthProvider'
import { AppRoutes } from './router/AppRoutes'

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
