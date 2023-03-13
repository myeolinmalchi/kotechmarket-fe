import DarkModeProvider from './DarkModeProvider';
import SideNavProvider from './SideNavProvider';
import UserLoginProvider from './UserLoginProvider';
import { combineComponents } from '../utils/combineComponents';
import MediaQueryProvider from './MediaQueryProvider';

const providers = [
  DarkModeProvider,
  SideNavProvider,
  UserLoginProvider,
  MediaQueryProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
