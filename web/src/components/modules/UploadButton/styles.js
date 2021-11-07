import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {
    fontSize: 14,
    position: 'fixed',
    zIndex: 100,
    top: 20,
    right: 40,
    background: 'none',
    outline: 'none',
    color: 'white',
    border: 'none',
    textTransform: 'uppercase',

    '&:hover': {
      cursor: 'pointer',
      color: '#0000ff'
    },
    '&:active': {
      color: '#0000ff'
    }
  }
}, { name: 'UploadButton' })
