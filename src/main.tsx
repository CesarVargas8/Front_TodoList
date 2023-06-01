import React from 'react';
import ReactDOM from 'react-dom/client';

import { NavigationPage } from './navigate/NavigationPages';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <MainPage /> */}
    <NavigationPage />
  </React.StrictMode>
);
