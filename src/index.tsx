import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Update } from './components/Update';
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: `/edit/:bankId`,
    element: <Update />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
