import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../Pages/Game";
import Navbar from "../Layout/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="games/genre" element={<Genre />} />
      <Route path="games/game-name" element={<Game />} />
    </Route>
  )
);

export default router;