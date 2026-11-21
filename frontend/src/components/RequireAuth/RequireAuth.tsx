import type { JSX, ReactNode } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../auth/useAuth'

export interface RequireAuthProps {
  children: ReactNode
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
