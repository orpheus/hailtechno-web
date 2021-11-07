import { createUseStyles } from 'react-jss'
import helveticaBlack from '../../public/assets/fonts/Helvetica Black.ttf'
import batmfa__ from '../../public/assets/fonts/batman_forever/batmfa__.ttf'
import spaceAge from '../../public/assets/fonts/space_age/space_age.ttf'
import gameOfSquids from '../../public/assets/fonts/game_of_squids/Game_Of_Squids.ttf'
import ethnocentric from '../../public/assets/fonts/ethnocentric/ethnocentric_rg.ttf'
import OrbitronEB from '../../public/assets/fonts/Orbitron/static/Orbitron-ExtraBold.ttf'
import Orbitron from '../../public/assets/fonts/Orbitron/Orbitron.ttf'
import OrbitronBL from '../../public/assets/fonts/Orbitron/static/Orbitron-Black.ttf'
import OrbitronBO from '../../public/assets/fonts/Orbitron/static/Orbitron-Bold.ttf'

export default createUseStyles({
  '@font-face': [
    {
      fontFamily: 'Money',
      src: `url(${helveticaBlack})`
    },
    {
      fontFamily: 'BatmanForever',
      src: `url(${batmfa__})`
    },
    {
      fontFamily: 'SpaceAge',
      src: `url(${spaceAge})`
    },
    {
      fontFamily: 'GameOfSquids',
      src: `url(${gameOfSquids})`
    },
    {
      fontFamily: 'Ethnocentric',
      src: `url(${ethnocentric})`
    },
    {
      fontFamily: 'OrbitronEB',
      src: `url(${OrbitronEB})`
    },
    {
      fontFamily: 'Orbitron',
      src: `url(${Orbitron})`
    },
    {
      fontFamily: 'OrbitronBL',
      src: `url(${OrbitronBL})`
    },
    {
      fontFamily: 'OrbitronBO',
      src: `url(${OrbitronBO})`
    }
  ],
  root: {
    height: '100%'
  }
}, { name: 'App' })
