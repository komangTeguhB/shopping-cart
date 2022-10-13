import React, { createContext, ReactElement, ReactNode, useReducer } from 'react';
import Reducer from './reducer';

const initialState = {
  interactions: [] as any,
  carts: [] as any,
}

const globalContext = createContext<{
  globalState: any; 
  dispatch: React.Dispatch<any>;
}>({
  globalState: initialState,
  dispatch: () => null
});

function initializeState() {
  return initialState;
}

function GlobalStore({ children }: { children: ReactNode }): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initializeState());
  
  return <globalContext.Provider value={{ globalState, dispatch }}>{children}</globalContext.Provider>;
}

export { globalContext, GlobalStore };




