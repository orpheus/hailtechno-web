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
    width: '100%',
    height: '100%'
  }
}), { name: 'ArtPage' })
