// app/StoreProvider.tsx — Client component wrapper for Next.js App Router

'use client';

import { Provider } from 'react-redux';
import { store } from '../store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

