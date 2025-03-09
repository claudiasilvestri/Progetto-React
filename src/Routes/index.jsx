import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Navbar from "../Layout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="games/genre" element={<Genre />} />
      <Route path="games/game-name" element={<Game />} />
    </Route>
  )
);

export default router;
