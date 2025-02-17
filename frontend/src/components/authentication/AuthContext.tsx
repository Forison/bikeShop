import React, { createContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../utils/interface/user'
// import AlertBanner from '../../presentational/AlertBanner'
import { fetchUser } from '../../services/fetchUser'

interface AuthContextType {
  user: User | undefined
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, error } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
  })

  // const errorBanner = error ? (
  //   <AlertBanner variant='danger' message={'You are currently not signed in'} />
  // ) : null

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
      {/* {errorBanner} */}
    </AuthContext.Provider>
  )
}
