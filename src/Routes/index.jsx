import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Platform from "../pages/Platform";
import SearchResults from "../pages/SearchResults";
import SignUp from "../Pages/SignUp";
import Navbar from "../Components/Header"; 
import SignIn from "../Pages/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="games/genre/:id" element={<Genre />} />
      <Route path="games/:id/:game" element={<Game />} />
      <Route path="games/platform/:platformID" element={<Platform />} />
      <Route path="search/:query" element={<SearchResults />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
    </Route>
  )
);

export default router;


