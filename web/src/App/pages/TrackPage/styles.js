import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    bottom: theme.playerBar.height,
    left: theme.appNav.width,
    width: `calc(100% - ${theme.appNav.width}px)`,
    boxSizing: 'border-box',
    paddingTop: 50,
    overflow: 'auto'
  },

}), { name: 'TrackPage' })
