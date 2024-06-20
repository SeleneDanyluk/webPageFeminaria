import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import UserLayout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard';
import Autoras from './components/authors/Autoras';
import Contact from './components/contact/Contact';
import Books from "./components/books/Books";
import { useState } from "react";
import SignIn from "./components/signin/SignIn";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard></Dashboard>
        </Layout>
      ),
    },
    {
      path: "/libros",
      element: (
        <Layout>
          <Books></Books>
        </Layout>
      ),
    },
    {
      path: "/autoras",
      element: (
        <Layout>
          <Autoras></Autoras>
        </Layout>
      ),
    },
    {
      path: "/contacto",
      element: (
        <Layout>
          <Contact></Contact>
        </Layout>
      ),
    },
    {
      path: "/SignIn",
      element: (
        <Layout>
          <SignIn></SignIn>
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login></Login>
        </Layout>
      ),
    },
  ]);

  return (
    <div>
      {<RouterProvider router={router} />}
    </div>
  );
};

export default App
