import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./error-page.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuRestaurant from "./pages/restaurant/index.tsx";
import FoodMenu from "./pages/foodMenu/index.tsx";
import Login from "./pages/auth/login/index.tsx";
import DetailMenu from "./pages/detailMenu/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "restaurants",
        element: <MenuRestaurant />,
      },
      {
        path: "food-menu",
        element: <FoodMenu />,
        children: [{ path: ":id", element: <DetailMenu /> }],
      },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
