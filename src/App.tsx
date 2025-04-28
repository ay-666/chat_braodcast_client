import { useEffect, useRef, useState } from "react";

import "./App.css";
import Landing from "./pages/Landing";

import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Landing />
    },{
      path:'/chat',
      element:<ChatRoom/>
    }
  ]);


  return (
    <>
    <RouterProvider router={appRouter}>

    </RouterProvider>
    <ToastContainer />
    </>
  );
}

export default App;
