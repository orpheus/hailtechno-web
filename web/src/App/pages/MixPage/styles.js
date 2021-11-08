import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    left: `calc(${theme.appNav.width}-${theme.appNav.width})px`,
    bottom: theme.playerBar.height
  }
}), { name: 'MixPage' })
