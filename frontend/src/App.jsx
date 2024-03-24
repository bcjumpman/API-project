import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation-bonus";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/spots/new",
        element: <CreateSpot />,
      },
      {
        path: "/spots/current",
        element: <ManageSpots />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetails />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpot />,
      },
      {
        path: "*",
        element: <h2>Page Not Found</h2>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
