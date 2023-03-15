import DarkModeProvider from './DarkModeProvider';
import SideNavProvider from './SideNavProvider';
import UserLoginProvider from './UserLoginProvider';
import { combineComponents } from '../utils/combineComponents';
import MediaQueryProvider from './MediaQueryProvider';
import ToastProvider from './ToastProvider';

const providers = [
  DarkModeProvider,
  SideNavProvider,
  UserLoginProvider,
  MediaQueryProvider,
  ToastProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
