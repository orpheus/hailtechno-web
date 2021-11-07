import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()
export default function ReactQueryProvider ({ children }) {
  return <ReactQueryCacheProvider queryCache={queryCache}>
    {children}
  </ReactQueryCacheProvider>
}
