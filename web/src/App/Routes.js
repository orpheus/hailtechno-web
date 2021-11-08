import {
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/HomePage/HomePage'
import ArtPage from './pages/ArtPage/ArtPage'
import TrackPage from './pages/TrackPage/TrackPage'
import MixPage from './pages/MixPage/MixPage'
import AboutPage from './pages/AboutPage/AboutPage'

const AppRoutes = () => {
  return <Routes>
    <Route path={'/'} element={<Home />} />
    <Route path={'tracks'} element={<TrackPage />} />
    <Route path={'mixes'} element={<MixPage />} />
    <Route path={'art'} element={<ArtPage />} />
    <Route path={'about'} element={<AboutPage />} />
  </Routes>
}

export default AppRoutes
