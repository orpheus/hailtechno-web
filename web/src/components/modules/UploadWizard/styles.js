import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -80%)',
    minHeight: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 200,
    padding: 30
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  doneButton: {
    border: '1px solid black',
    marginTop: 5
  }
}, { name: 'UploadWizard' })
