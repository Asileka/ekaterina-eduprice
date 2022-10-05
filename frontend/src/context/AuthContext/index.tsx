import { AxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { api } from '../../services/api'
import { setAuthorizationHeader } from '../../services/interceptors'
import { createTokenCookies, getToken, removeTokenCookies } from '../../utils/tokenCookies'

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  register: (credentials: SignInCredentials) => Promise<void | AxiosError>
  user: User
  isAuthenticated: boolean
  loadingUserData: boolean
  errMsg: string
  errMsg2: string
  errEmail: string[]
  errPassword: string[]
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const isAuthenticated = Boolean(token)
  const userData = user as User
  const [errMsg, setErrMsg] = useState('')
  const [errMsg2, setErrMsg2] = useState('')
  const [errEmail, setErrEmail] = useState([])
  const [errPassword, setErrPassword] = useState([])

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login/', { email, password })
      const { access, refresh, permissions, roles } = response.data

      createTokenCookies(access, refresh)
      setUser({ email, permissions, roles })
      setAuthorizationHeader(api.defaults, access)
    } catch (error) {
      const err = error as AxiosError
      const errorMessage = err.response?.data.detail
      setErrMsg(errorMessage)
      console.log(errorMessage)
      return err
    }
  }
  async function register ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/register/', { email, password })
      const { access, refresh, permissions, roles } = response.data

      createTokenCookies(access, refresh)
      setUser({ email, permissions, roles })
      setAuthorizationHeader(api.defaults, access)
    } catch (error) {
      const err = error as AxiosError
      let errorMessage = ''

      if (err.response?.status === 400) {
        errorMessage = ('There are invalid fields, please fix the errors bellow')
      } else {
        errorMessage = err.response?.data.detail
      }
      setErrEmail(err.response?.data.email)
      setErrPassword(err.response?.data.password)
      setErrMsg2(errorMessage)
      return err
    }
  }

  function signOut (pathname = '/login') {
    removeTokenCookies()
    setUser(null)
    setLoadingUserData(false)
    navigate(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData () {
      setLoadingUserData(true)

      try {
        const response = await api.get('/user/')

        if (response?.data) {
          const { email, permissions, roles } = response.data
          setUser({ email, permissions, roles })
        }
      } catch (error) {
        signOut()
      }

      setLoadingUserData(false)
    }

    if (token) {
      setAuthorizationHeader(api.defaults, token)
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: userData,
      loadingUserData,
      signIn,
      signOut,
      register,
      errMsg,
      errMsg2,
      errEmail,
      errPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}
