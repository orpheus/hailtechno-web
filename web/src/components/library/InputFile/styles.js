import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {},
  fileInput: {
    display: 'none'
  },
  label: {
    border: '1px solid #ccc',
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer'
  }
}, { name: 'FileInput' })
