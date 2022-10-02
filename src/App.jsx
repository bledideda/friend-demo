import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import CategoryScreen from "./screens/CategoryScreen";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ProductScreen from "./screens/ProductScreen";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    errorElement: <NotFoundScreen />
  },
  {
    path: "/:category",
    element: <CategoryScreen />,
    errorElement: <NotFoundScreen />
  },
  {
    path: "/:category/:subcategory",
    element: <CategoryScreen />,
    errorElement: <NotFoundScreen />
  },
  {
    path: "/:category/:subcategory/:id",
    element: <ProductScreen />,
    errorElement: <NotFoundScreen />
  },
  {
    path: "*",
    element: <NotFoundScreen />,
    errorElement: <NotFoundScreen />
  },
]);

function App() {
  return (<RouterProvider router={router}/>);
}

export default App;
