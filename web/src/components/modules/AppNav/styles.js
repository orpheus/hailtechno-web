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
    fontSize: 20,
    fontFamily: 'Orbitron',
    color: 'white',
    marginLeft: 30,

    '&:visited': {
      color: '#ffffff'
    },
    '&:active': {
      color: 'beige',
      textShadow: '0 2px 4px rgba(0,0,0,1)'
    },
    '&:hover': {
      color: 'beige',
      textShadow: '0 2px 4px rgba(0,0,0,1)',
      textDecoration: 'underline'
    }
  }
}), { name: 'AppNav' })
