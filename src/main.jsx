import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './components/AuthProvider.jsx';
import AllJobs from './components/AllJobs';
import AppliedJobs from './components/AppliedJobs';
import AddJob from './components/AddJob';
import MyJobs from './components/MyJobs';
import Blogs from './components/Blogs';
import Login from './components/Login';
import JobDetail from './components/JobDetail.jsx';
import Register from './components/Register';
import Private from './components/Private';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Premium from './components/Premium.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-jobs",
        element: <AllJobs />,
      },
      {
        path: "/applied-jobs",
        element: <Private><AppliedJobs /></Private>,
      },
      {
        path: "/add-job",
        element: <Private><AddJob /></Private>,
      },
      {
        path: "/my-jobs",
        element: <Private><MyJobs /></Private>,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/job/:id",
        element: <Private><JobDetail /></Private>,
      },
      {
        path: "/premium",
        element: <Private><Premium /></Private>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
