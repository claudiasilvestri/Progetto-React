import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";
import Platform from "../Pages/Platform";
import Navbar from '../Components/Header'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/" element={<Home />} />
      <Route path="games/genre/:id" element={<Genre />} /> 
      <Route path="games/:id/:game" element={<Game />} />  
      <Route path="platform/:platformId" element={<Platform />} />
    </Route>
  )
);

export default router;

