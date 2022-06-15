import React from 'react';
import { createRoot } from 'react-dom/client';
import RootRoute from './router';
import 'default-passive-events';
import './index.less';
import './wlyUi.less';
import { inintLocalStorage } from './utils/tools';
inintLocalStorage({ theme: 'light', platform: 'theme-tool' });
createRoot(document.querySelector('#root') as Element).render(<RootRoute />);
