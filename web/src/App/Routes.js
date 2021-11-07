import {
  Routes,
  Route
} from 'react-router-dom'
// import LazyLoad from 'Components/util/LazyLoad'
// const Home = LazyLoad(() => import('./pages/HomePage/HomePage'))
import Home from './pages/HomePage/HomePage'

const AppRoutes = () => {
  return <Routes>
    <Route path={'/'} element={<Home />} />
    <Route path={'tracks'} element={<Home />} />
    <Route path={'mixes'} element={<Home />} />
    <Route path={'art'} element={<Home />} />
    <Route path={'about'} element={<Home />} />
  </Routes>
}

export default AppRoutes
