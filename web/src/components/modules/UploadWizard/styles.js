import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -80%)',
    minHeight: 100,
    width: 100,
    // backgroundColor: '#301b83',
    backgroundColor: '#000000',
    zIndex: 200,
    padding: 70,
    color: 'white',
    border: '1px solid white'
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    top: -10
  },
  input: {
    marginBottom: 10,
    padding: 5,
    width: 170,
    backgroundColor: 'beige',
    boxSizing: 'content-box',
    '&--error': {
      outline: 'red auto 1px'
    }
  },
  label: {
    fontFamily: 'Orbitron'
  },
  uploadFileButton: {
    backgroundColor: 'beige',
    fontFamily: 'SpaceAge',
    padding: '3px 0',
    border: '3px solid black',
    color: 'black',
    width: 147,
    textAlign: 'center',
    boxSizing: 'border-box',
    marginBottom: 10
  },
  spaceButton: {
    backgroundColor: 'beige',
    fontFamily: 'SpaceAge',
    padding: '5px 13px',
    border: '3px solid black',

    '&:active': {
      color: '#301b83',
      fontWeight: 'bold',
      boxShadow: '0 2px 2px rgba(0,0,0,.5)'
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  filename: {
    textAlign: 'center',
    whiteSpace: 'pre',
    textOverflow: 'ellipsis',
    maxWidth: 180,
    overflow: 'hidden',
    marginBottom: 5
  },
  disabled: {
    color: 'grey',
    borderColor: 'grey',
    backgroundColor: 'lightgrey',
    '&:active': {
      color: 'grey',
      boxShadow: 'unset',
      fontWeight: 'normal'
    },
    '&:hover': {
      cursor: 'default'
    }
  },
  validationError: {
    color: 'red',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  successText: {
    fontFamily: 'Orbitron',
    fontWeight: 'bold'
  },
  errorText: {
    fontFamily: 'Orbitron',
    color: 'red',
    fontWeight: 'bold'
  }
}, { name: 'UploadWizard' })
