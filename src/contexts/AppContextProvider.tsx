import DarkModeProvider from './DarkModeProvider';
import SideNavProvider from './SideNavProvider';
import UserLoginProvider from './UserLoginProvider';
import { combineComponents } from '../utils/combineComponents';
import MediaQueryProvider from './MediaQueryProvider';
import ToastProvider from './ToastProvider';
import { NavigationContextProvider } from './NavigatingContext';
import { URLProvider } from './URLContextProvider';
import ModalProvider from './ModalPrivider';

const providers = [
  DarkModeProvider,
  SideNavProvider,
  UserLoginProvider,
  MediaQueryProvider,
  ToastProvider,
  NavigationContextProvider,
  URLProvider,
  ModalProvider,
];

const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;
