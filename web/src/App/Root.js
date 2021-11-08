import App from './App'
import RootProvider from 'Components/providers/RootProvider'

const Root = () => {
  console.log(process.env)
  return <RootProvider>
    <App />
  </RootProvider>
}

export default Root
