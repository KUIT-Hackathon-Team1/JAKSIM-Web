import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Landing/Landing";
import Home from "./Home/Home";
import GoalNew from "./GoalNew/GoalNew";
import MyGoal from "./MyGoal/MyGoal";
import Test from "./Test/Test";
import GoalContinue from "./GoalContinue/GoalContinue";

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
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/goal/continue",
    element: <GoalContinue />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
