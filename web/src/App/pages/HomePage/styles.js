import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  homePageRoot: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    left: theme.appNav.width,
    bottom: theme.playerBar.height
  },
  videobg: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%'
  },
  sideNav: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    color: 'white',
    paddingLeft: '50px',
    paddingTop: '5%',
    flex: 1
  }
}), { name: 'HomePage' })
