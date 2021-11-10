import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    bottom: theme.playerBar.height,
    left: theme.appNav.width,
    width: `calc(100% - ${theme.appNav.width}px)`,
    boxSizing: 'border-box'
  },
  header: {
    height: 50
  },
  trackRow: {
    padding: '15px 40px',
    fontFamily: 'SYSTEM-UI',
    borderBottom: '1px solid white',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.12)',
      cursor: 'pointer'
    }
  },
  title: {
    color: 'white',
    display: 'block',
    fontSize: 12
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
}), { name: 'TrackPage' })
