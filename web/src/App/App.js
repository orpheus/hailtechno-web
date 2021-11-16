import { ReactQueryDevtools } from 'react-query-devtools'
import Routes from './Routes'
import AppNav from 'Components/modules/AppNav/AppNav'
import PlayBar from 'Components/modules/PlayerBar/PlayerBar'
import styles from './appStyles'
import UploadButton from 'Components/modules/UploadButton/UploadButton'
import { useLocation } from 'react-router-dom'

const showNav = pathname => {
  switch (pathname) {
    // case '/':
    case '/art':
      return false
    default:
      return true
  }
}

const App = () => {
  const c = styles()
  const location = useLocation()

  return <div className={c.root}>
    <Routes />
    {showNav(location.pathname) && <AppNav />}
    <PlayBar />
    <UploadButton />
    {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
  </div>
}

export default App
