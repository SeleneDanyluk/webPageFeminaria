import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import UserLayout from './components/layout/UserLayout'
import Dashboard from './components/dashboard/Dashboard';
import Autoras from './components/autoras/Autoras';
import Contact from './components/contacto/Contacto';
import { useState } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserLayout>
          <Dashboard></Dashboard>
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
          <Contact></Contact>
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
