import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Landing/Landing";
import Home from "./Home/Home";
import GoalNew from "./GoalNew/GoalNew";
import MyGoal from "./MyGoal/MyGoal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/goal/new",
    element: <GoalNew />,
  },
  {
    path: "/goal/:id",
    element: <MyGoal />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
