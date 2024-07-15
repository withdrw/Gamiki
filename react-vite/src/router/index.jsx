import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Homepage from "../components/Homepage/Homepage";
import ManagePost from "../components/ManagePost/ManagePost";
import CreatePost from "../components/CreatePost/CreatePost";
import PostPage from "../components/PostPage/PostPage";
import ManageComment from "../components/ManageComment/ManageComment";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
      {
        path: "/manage-comment",
        element: <ManageComment />,
      },
    ],
  },
]);
