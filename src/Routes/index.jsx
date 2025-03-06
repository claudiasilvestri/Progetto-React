import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Markup from "../Layout";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Markup />}>
    <Route path="/" element={<Home />} />
      <Route path="games/genre" element={<Genre />} />
      <Route path="games/game-name" element={<Game />} />
    </Route>
  )
);

export default router;

