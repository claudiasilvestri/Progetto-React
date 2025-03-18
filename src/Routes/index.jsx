import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Platform from "../pages/Platform";
import SearchResults from "../pages/SearchResults";
import Navbar from "../Components/Header"; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="games/genre/:id" element={<Genre />} />
      <Route path="games/:id/:game" element={<Game />} />
      <Route path="games/platform/:platformID" element={<Platform />} />
      <Route path="search/:query" element={<SearchResults />} />
    </Route>
  )
);

export default router;


