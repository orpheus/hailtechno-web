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
    marginBottom: 30,
    fontSize: 30,
    fontFamily: 'Orbitron',
    textTransform: 'uppercase',
    color: 'white',
    marginLeft: 60,

    '&:visited': {
      color: '#ffffff'
    },
    '&:active': {
      color: '#0000ff',
      textShadow: '0 2px 4px rgba(0,0,0,1)'
    },
    '&:hover': {
      color: '#0000ff',
      textShadow: '0 2px 4px rgba(0,0,0,1)'
    }
  }
}), { name: 'AppNav' })
