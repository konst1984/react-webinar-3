import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../app/main";
import App from "../app";
import Product from "../app/product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
]);

export default router;
