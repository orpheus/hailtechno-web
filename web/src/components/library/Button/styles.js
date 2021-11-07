import { createUseStyles } from 'react-jss'

export default createUseStyles({
  root: {
    fontSize: 14,
    background: 'none',
    outline: 'none',

    '&:hover': {
      cursor: 'pointer',
      color: '#0000ff'
    },
    '&:active': {
      color: '#0000ff'
    }
  }
}, { name: 'Button' })
