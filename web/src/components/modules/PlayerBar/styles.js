import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  root: {
    height: theme.playerBar.height,
    width: '100%',
    borderTop: '1px solid white',
    zIndex: 100,
    backgroundColor: 'black',
    position: 'fixed',
    bottom: 0,
    left: 0
  }
}), { name: 'PlayBar' })
