import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout';
import HandleUsers from './components/HandleUsers';
import UserInHandle from './components/UserInHandle';
import Products from './pages/Products/Products';
import AdminLayout from './pages/Admin/AdminLayout';
import Edit from './pages/Admin/Edit/Edit';
import Home from './pages/Home/Home';
import Product from './pages/Product/ProductItem';
import Login from './pages/Login/Login';
import ListProducts from './pages/Admin/ListProducts/ListProducts';
import NewProduct from './pages/Admin/NewProduct/NewProduct';
import Delete from './pages/Admin/Delete/Delete';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';

import AdminAuth from './components/AdminAuth';
import CartPage from './pages/Cart/CartPage';
import PurchaseHistory from './pages/PurchaseHistory/PurchaseHistory';
import ListOrders from './pages/Admin/ListOrders/ListOrders';
import OrderDetails from './pages/Admin/OrderDetails.js/OrderDetails';
import ProductItem from './pages/Product/ProductItem';
import Rates from './pages/Product/Rates/Rates';
import Login2 from './pages/Login/Login_v2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/admin",
        element: <AdminAuth><AdminLayout /></AdminAuth>,
        children: [
          {
            path: "termekek",
            element: <ListProducts />
          },
          {
            path: "rendelesek",
            element: <ListOrders />
          },
          {
            path: "rendeles/:orderid",
            element: <OrderDetails />
          },
          {
            path: "userek-kezelese",
            element: <HandleUsers />
          },
          {
            path: "userek-kezelese/:id",
            element: <UserInHandle />
          },
          {
            path: "termek-felvitel",
            element: <NewProduct />
          },
          {
            path: "termekek/:productid/modositas",
            element: <Edit />
          },
          {
            path: "termekek/:productid/torles",
            element: <Delete />
          },
          {
            path: "userek-kezelese/:userid/torles",
            element: <Delete />
          },
        ]
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/termekek",
        element: <Products />
      },

      {
        path: "/termekek/:id",
        element: <ProductItem />,
        children: [
          {
            path: "velemenyek",
            element: <Rates />
          }
        ]
      },
      {
        path: "/kosar",
        element: <CartPage />
      },
      {
        path: "/belepes",
        element: <Login2 />
      },
      {
        path: "/regisztracio",
        element: <RegisterForm />
      },
      {
        path: "/felhasznalo/:id",
        element: <UserProfile />,
        children: [
          {
            path: "rendelesek",
            element: <PurchaseHistory />
          },
          {
            path: "beallitasok",
            element: <UserSettings />
          }
        ]
      }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RouterProvider router={router} />

);


