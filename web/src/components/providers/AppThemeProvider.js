import theme from '../../theme/AppTheme'
import { ThemeProvider } from 'react-jss'

export default function AppThemeProvider (props) {
  return <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
}
