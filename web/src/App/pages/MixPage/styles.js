import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    backgroundColor: 'black',
    position: 'relative',
    left: `calc(${theme.appNav.width}-${theme.appNav.width})px`,
    height: `calc(100% - ${theme.playerBar.height}px)`
  }
}), { name: 'MixPage' })
