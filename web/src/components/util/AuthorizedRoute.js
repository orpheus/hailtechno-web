import { Redirect, Route } from 'react-router-dom'
import { useLoginAuth } from 'Components/providers/LoginAuthProvider'

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const { authorized } = useLoginAuth()

  return <Route
    {...rest} render={(props) => (
      authorized ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
        />
    )}
  />
}

export default AuthorizedRoute
