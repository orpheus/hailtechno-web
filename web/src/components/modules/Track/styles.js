import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {
    padding: '11px 40px', // was 15px
    fontFamily: 'SYSTEM-UI',
    borderBottom: '1px solid white',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.12)',
      cursor: 'pointer'
    },
    '&--active': {
      backgroundColor: 'rgba(255,255,255,0.12)'
    }
  },
  dataBlock: {
    display: 'inline-block'
  },
  title: {
    color: 'white',
    display: 'inline',
    fontSize: 12
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }

}, { name: 'Track' })
