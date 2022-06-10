import React from 'react';
import { createRoot } from 'react-dom/client';
import RootRoute from './router';
import './index.less';
import { inintLocalStorage } from './utils/tools';
inintLocalStorage({ theme: 'light', platform: 'theme-tool' });
createRoot(document.querySelector('#root') as Element).render(<RootRoute />);
