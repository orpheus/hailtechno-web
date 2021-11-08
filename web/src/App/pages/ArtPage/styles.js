import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  homePageRoot: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    left: `calc(${theme.appNav.width}-${theme.appNav.width})px`,
    bottom: theme.playerBar.height
  },
  videobg: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%'
  }
}), { name: 'ArtPage' })
