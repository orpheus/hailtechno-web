import App from './App'
import RootProvider from 'Components/providers/RootProvider'

const Root = () => {
  return <RootProvider>
    <App />
  </RootProvider>
}

export default Root
