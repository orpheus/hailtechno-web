import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: `calc(100% - ${theme.playerBar.height}px)`,
    backgroundColor: 'black',
    position: 'relative',
    left: theme.appNav.width,
    width: `calc(100% - ${theme.appNav.width}px)`,
    boxSizing: 'border-box',
    padding: '0 40px'
  },
  header: {
    height: 50
  },
  '& pre': {
    color: 'white'
  },
  about: {
    color: 'white',
    display: 'inline-flex',
    flexDirection: 'column'
  },
  alias: {
    marginLeft: 152,
    display: 'block',
    color: 'white',
    '&:visited': {
      color: '#6565ff'
    }
  }
}), { name: 'AboutPage' })
