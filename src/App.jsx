import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import Layout from "./components/layout/Layout";
import Dashboard from './components/dashboard/Dashboard';
import Autoras from './components/authors/Autoras';
import Contact from './components/contact/Contact';
import Books from "./components/books/Books";
import { useState, useContext } from "react";
import SignIn from "./components/signin/SignIn";
import CreateUser from "./components/createUser/CreateUser";
import Users from "./components/users/Users";
import UserContext, { UserProvider } from "./context/userContext"
import Login from "./components/login/Login"
import Cart from "./components/cart/Cart";
import NewBook from "./components/newBook/NewBook.jsx";


function App() {
  const context = useContext(UserContext)

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
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart></Cart>
        </Layout>
        ),
    },
      {
      path: "/createadmin",
      element: (
        <Layout>
          <CreateUser></CreateUser>
        </Layout>
      ),
    },
    {
      path: "/newbook",
      element: (
        <Layout>
          <NewBook></NewBook>
        </Layout>
        ),
    },
    {
      path: "/usuarios",
      element: (
        <Layout>
          <Users />
        </Layout>
      ),
    },
  ]);

  return (
    <div>
      {
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      }
    </div>
  );
};

export default App
