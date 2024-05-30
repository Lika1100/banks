import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import {HashRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {store} from "./redux/store";

declare global {
  interface Array<T> {
      toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
      with(index: number, value: T): T[];
      toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}


// https://reactrouter.com/en/main/route/route#route

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
