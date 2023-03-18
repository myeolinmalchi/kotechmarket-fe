import React, { useState } from 'react';
import Layout from './src/components/common/Layout';
import AppContextProvider from './src/contexts/AppContextProvider';
import { WrapPageElementBrowserArgs } from 'gatsby';

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => {
  return (
    <AppContextProvider>
      <Layout {...props}>{element}</Layout>
    </AppContextProvider>
  );
};
