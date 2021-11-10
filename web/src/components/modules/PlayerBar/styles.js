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
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

    // '$--active': {
    //   height: theme.playerBar.height
    // }
  },
  stopButton: {
    width: 30,
    height: 30,
    borderStyle: 'solid',
    borderWidth: 7,
    borderColor: '#ffffff',
    backgroundColor: '#000000',
    cursor: 'pointer',

    '&:active': {
      borderColor: '#000000',
      backgroundColor: '#ffffff'
    }
  },
  playButton: {
    width: 3,
    height: 30,
    borderStyle: 'solid',
    borderWidth: '14px 0px 14px 26px',
    borderColor: 'transparent transparent transparent #ffffff',
    boxSizing: 'border-box',
    backgroundColor: '#000000',
    cursor: 'pointer',
    left: 7,
    position: 'relative'

    // '&:active': {
    //   borderColor: 'transparent transparent transparent #000000',
    //   backgroundColor: '#ffffff'
    // }
  }
}), { name: 'PlayBar' })
