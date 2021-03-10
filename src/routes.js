import React from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import ListView from 'src/views/StudentsList/ListView';
import Books from 'src/views/BooksList/ListView';
import BooksCategory from 'src/views/BooksCategoryList/ListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'student', element: <ListView /> },
      { path: 'books', element: <Books /> },
      { path: 'category', element: <BooksCategory /> },
      // { path: 'dashboard', element: <DashboardView /> },
      // { path: 'products', element: <ProductListView /> },
      // { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Redirect to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Redirect to="/app/student" /> },
      { path: '*', element: <Redirect to="/404" /> }
    ]
  }
];

export default routes;