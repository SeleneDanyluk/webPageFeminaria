import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import UserLayout from './components/layout/UserLayout'
import Dashboard from './components/dashboard/Dashboard';
import Autoras from './components/autoras/Autoras';
import Contacto from './components/contacto/Contacto';
import { useState } from "react";
import Login from "./components/login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserLayout>
          <Login></Login>
        </UserLayout>
      ),
    },
    {
      path: "/autoras",
      element: (
        <UserLayout>
          <Autoras></Autoras>
        </UserLayout>
      ),
    },
    {
      path: "/contacto",
      element: (
        <UserLayout>
          <Contacto></Contacto>
        </UserLayout>
      ),
    },
  ]);

  return (
    <div >
      {<RouterProvider router={router} />}
    </div>
  );
};

export default App
