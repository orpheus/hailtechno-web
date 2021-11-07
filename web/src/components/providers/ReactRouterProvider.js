import { BrowserRouter } from 'react-router-dom'
// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory()

export default function ReactRouterProvider ({ children }) {
  return <BrowserRouter>
    {children}
  </BrowserRouter>
}
