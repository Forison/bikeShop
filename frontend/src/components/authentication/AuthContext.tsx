import React, { createContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../utils/interface/user'
import AlertBanner from '../../presentational/AlertBanner'
import { fetchUser } from '../../services/fetchUser'

interface AuthContextType {
  user: User | undefined
}
export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser()
  })

  if (error instanceof Error) return <AlertBanner variant='danger' message={error.message} />

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
