import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Movies from "./pages/movies/movies";
import Series from "./pages/series/series";
import Trending from "./pages/trending/trending";
import MyList from "./pages/myList/myList";
import Layout from "./layout/layout";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, 
        element: <App /> 
      },
      { path: "movies",
        element: <Movies /> 
      },
      { path: "series",
        element: <Series />
      },
      { path: "trending",
        element: <Trending /> 
      },
      { path: "my-list",
        element: <MyList />
      },
    ],
  },
]);