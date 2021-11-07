export function hasPermission (userPermissions, permission) {
  if (Array.isArray(permission)) {
    return permission.every(p => _hasPermission(userPermissions, p, 0))
  }
  return _hasPermission(userPermissions, permission, 0)
}

export function _hasPermission (userPermissions, permission, count) {
  if (count === userPermissions.length) return false
  const userPermission = userPermissions[count]
  if (userPermission === '*') return true
  if (userPermission === permission) return true
  if (isParentPermission(userPermission, permission)) return true
  return _hasPermission(userPermissions, permission, count + 1)
}

export function isParentPermission (parent, child) {
  if (!parent || !child) return false
  const ps = parent.split('.')
  const cs = child.split('.')

  return doesMatch(ps, cs, 0)
}

function doesMatch (ps, cs, count) {
  if (count === ps.length || count === cs.length) return false
  if (ps[count] === cs[count]) return doesMatch(ps, cs, count + 1)
  else return ps[count] === '*'
}

export default hasPermission

// -----------------------------------------------------
// I'm keeping these deprecated functions as a
// performance test example. See the  tests for
// this file.
// -----------------------------------------------------

// eslint-disable-next-line camelcase
export const hasPermission__deprecated = (userPermissions, permission) => {
  if (!userPermissions || !permission) return false
  if (Array.isArray(permission)) {
    return permission.every(p => checkPermission__deprecated(userPermissions, p))
  } else {
    return checkPermission__deprecated(userPermissions, permission)
  }
}

// eslint-disable-next-line camelcase
const checkPermission__deprecated = (userPermissions = [], permission = '') => {
  const permParts = permission.split('.')

  for (const uPerm of userPermissions) {
    const uPermParts = uPerm.split('.')

    let match = true
    for (let i = 0; i < permParts.length; i++) {
      // If we do not have a match, then exit the loop early
      if (!match) { break }

      // Detect if the endpoint has a "sub-permission" and the user permission does not have a "sub-permission", if so, then the user has access
      if (!uPermParts[i]) { return true }
      // If the user has wildcard permissions, immediately return true
      if (uPermParts[i] === '*') { return true }

      // Check if this "sub-hierarchy" matches, if not, check if the endpoint permission is a `view` permission,
      // if it is not a view permission as well, then match = false.
      if (permParts[i] !== uPermParts[i]) { match = false }
    }

    // Detect if the user has a "sub-permission" and the endpoint permission does not have a "sub-permission"
    if (match && permParts.length < uPermParts.length) { match = false }

    // If the permission we just checked has a match, then return true
    if (match) { return true }
  }

  // Default return false, no permissions
  return false
}
