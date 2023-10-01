import React, {createContext, ReactNode, useContext} from 'react';
import RootStore, {rootStore} from './RootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export function RootStoreProvider({children}: { children: ReactNode }) {
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}

export function useRootStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }

    return context;
}
