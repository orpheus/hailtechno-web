import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: `calc(100% - ${theme.playerBar.height}px)`,
    backgroundColor: 'black',
    position: 'relative',
    left: theme.appNav.width,
    width: `calc(100% - ${theme.appNav.width}px)`,
    boxSizing: 'border-box',
    paddingTop: 50,
    overflow: 'auto'
  }

}), { name: 'TrackPage' })
