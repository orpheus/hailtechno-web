import { ReactQueryDevtools } from 'react-query-devtools'
import Routes from './Routes'
import AppNav from 'Components/modules/AppNav/AppNav'
import PlayBar from 'Components/modules/PlayerBar/PlayerBar'
import styles from './appStyles'
import UploadButton from 'Components/modules/UploadButton/UploadButton'

const App = () => {
  const c = styles()

  return <div className={c.root}>
    <Routes />
    <AppNav />
    <PlayBar />
    <UploadButton />
    {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
  </div>
}

export default App