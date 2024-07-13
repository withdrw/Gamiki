import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Homepage from '../components/Homepage/Homepage';
import ManagePost from '../components/ManagePost/managepost';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <h1>Welcome!</h1>,
      // },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/manage-post",
        element: <ManagePost />,
      },
    ],
  },
]);
