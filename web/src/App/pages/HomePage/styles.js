import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => ({
  homePageRoot: {
    height: '100%',
    backgroundColor: 'black',
    position: 'relative',
    left: theme.appNav.width,
    width: `calc(100% - ${theme.appNav.width}px)`,
    boxSizing: 'border-box'
  },
  videobg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
}), { name: 'HomePage' })
