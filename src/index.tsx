import React from 'react';
import { createRoot } from 'react-dom/client';
import RootRoute from './router';

createRoot(document.querySelector('#root') as Element).render(<RootRoute />);
