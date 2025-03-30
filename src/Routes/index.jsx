import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { SessionContext, SessionContextProvider } from "../Context/SessionContext";
import useSession from "../Hooks/useSession";  
import Navbar from "../Components/Header";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Platform from "../pages/Platform";
import SearchResults from "../pages/SearchResults";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import Account from "../Pages/Account";

export function ProtectedRoute() {
  const { user } = useContext(SessionContext);  

  if (!user) {
    return <Navigate to="/login" />;  
  }

  return <Outlet />;  
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="games/genre/:id" element={<Genre />} />
      <Route path="games/:id/:game" element={<Game />} />
      <Route path="games/platform/:platformID" element={<Platform />} />
      <Route path="search/:query" element={<SearchResults />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
    </Route>
  )
);

export function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default router;


