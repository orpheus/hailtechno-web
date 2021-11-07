import Loadable from 'react-loadable'

export default function LazyLoad (loader, height) {
  return Loadable({
    loader,
    loading: () => <div style={{ height } }/>
  })
}
