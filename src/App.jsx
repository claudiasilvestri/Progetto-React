import { RouterProvider } from "react-router-dom";
import { SessionContextProvider } from "./Context/SessionContext";  
import router from './Routes';

export function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;



