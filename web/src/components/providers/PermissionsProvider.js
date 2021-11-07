import { createContext, useEffect, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import hasPermission from '../../helpers/hasPermission'
import { useLoginAuth } from 'Components/providers/LoginAuthProvider'

export const PermissionsCtx = createContext(undefined)
// returns the 'hasPermission' function
export const usePermission = () => useContext(PermissionsCtx)

const PermissionsProvider = ({ children }) => {
  const [checkPermissions, setCheckPermissions] = useState(() => { return () => { return false } })
  const { state, authorized } = useLoginAuth()
  const user = state?.user

  // currently we only use permissions in the admin view
  // to display when selecting permissions during role creation/modification
  // no need as of now to provider permissions to ctx provider
  // as would call for a memoization.
  // can easily just get permissions using react-query's cache
  // queryCache.getCacheData('permissions')
  useQuery('permissions', () => null, {
    enabled: user && authorized,
    refetchOnWindowFocus: false
  })

  // Each time the user updates
  useEffect(() => {
    if (user !== undefined) {
      let permissions = []

      console.log('user', user)
      permissions = user.role?.permissions

      const checkPermission = (permission) => { return hasPermission(permissions, permission) }
      setCheckPermissions(() => checkPermission)
    }
  }, [user])

  return <PermissionsCtx.Provider value={checkPermissions}>
    {children}
  </PermissionsCtx.Provider>
}

export default PermissionsProvider
