import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#17882c'
    },
    secondary: {
      main: colors.indigo[500]
    },
  
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
},ptBR);

export default theme;
