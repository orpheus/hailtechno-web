import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    borderRight: '1px solid white',
    width: theme.appNav.width,
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    margin: 'auto',
    paddingTop: 80
  },
  linkBlock: {
    display: 'block'
  },
  link: {
    display: 'block',
    fontSize: 12,
    fontFamily: 'SYSTEM-UI',
    color: '#575757',
    padding: '10px 26px',
    textTransform: 'uppercase',

    '&:visited': {
      color: '#c5c5c5'
    },
    '&:hover': {
      backgroundColor: 'rgba(94,94,94,0.8)',
      color: '#ffffff'
      // textShadow: '0 2px 4px rgba(0,0,0,1)'
    },
    '&--active': {
      backgroundColor: 'rgba(94,94,94,0.8)',
      color: '#ffffff'
    }
  }
}), { name: 'AppNav' })
