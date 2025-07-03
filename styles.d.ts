import 'styled-components/native'
import { AppTheme } from './themes/global';


declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme { }
}
