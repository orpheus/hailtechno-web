import { Suspense } from 'react'

import AppThemeProvider from './AppThemeProvider'
import ViewportProvider from './ViewportProvider'
import ReactRouterProvider from './ReactRouterProvider'
import ReactQueryProvider from './ReactQueryProvider'
import LoginAuthProvider from './LoginAuthProvider'
import SnackbarProvider from './SnackbarProvider'
import PermissionsProvider from './PermissionsProvider'

/**
 * Add new providers here. They  will render in the order they appear in this array.
 */
const Providers = [
  ReactQueryProvider,
  ReactRouterProvider,
  LoginAuthProvider,
  PermissionsProvider,
  AppThemeProvider,
  ViewportProvider,
  SnackbarProvider
]

const AllProviders = ({ Providers, children }) => {
  const Provider = Providers.shift()
  if (!Provider) return children
  return <Provider>
    {AllProviders({ Providers, children })}
  </Provider>
}

export default function RootProvider ({ children }) {
  return <Suspense fallback={null}>
    <AllProviders Providers={Providers}>
      {children}
    </AllProviders>
  </Suspense>
}
