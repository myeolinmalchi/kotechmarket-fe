import React from 'react';
import DarkModeProvider, { DarkModeContext } from './DarkModeProvider';
import SideNavProvider, { SideNavContext } from './SideNavProvider';
import UserLoginProvider, { UserLoginContext } from './UserLoginProvider';
import { combineComponents } from '../utils/combineComponents';
import MediaQueryProvider, { MediaQueryContext } from './MediaQueryProvider';
import ToastProvider, { ToastContext } from './ToastProvider';
import {
  NavigationContext,
  NavigationContextProvider,
} from './NavigatingContext';
import { URLContext, URLProvider } from './URLContextProvider';
import ModalProvider, { ModalContext } from './ModalPrivider';
import StyleProvider, { StyleContext } from './StyleProvider';

const providers = [
  DarkModeProvider,
  StyleProvider,
  SideNavProvider,
  UserLoginProvider,
  MediaQueryProvider,
  ToastProvider,
  NavigationContextProvider,
  URLProvider,
  ModalProvider,
];

const AppContextProvider = combineComponents(...providers);

export const useDarkModeContext = () => React.useContext(DarkModeContext);
export const useStyleContext = () => React.useContext(StyleContext);
export const useSideNavContext = () => React.useContext(SideNavContext);
export const useUserLoginContext = () => React.useContext(UserLoginContext);
export const useMediaQueryContext = () => React.useContext(MediaQueryContext);
export const useToastContext = () => React.useContext(ToastContext);
export const useNavigationContext = () => React.useContext(NavigationContext);
export const useURLContext = () => React.useContext(URLContext);
export const useModalContext = () => React.useContext(ModalContext);

export default AppContextProvider;
