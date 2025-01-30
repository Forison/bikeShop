import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { getCookie } from '../../utils/helper/tokenHandler'
import { User } from '../../utils/interface/user'


interface AuthContextType {
  user: User | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

